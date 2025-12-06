import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log("🎯 Webhook POST received");
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  console.log("Stripe signature present:", !!sig);

  if (!sig) {
    console.error("❌ No Stripe signature found");
    return NextResponse.json(
      { error: "No Signature found for stripe" },
      { status: 400 }
    );
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      {
        error: "Stripe webhook secret is not set",
      },
      { status: 400 }
    );
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("✅ Webhook event constructed:", event.type);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      {
        error: `Webhook Error: ${error}`,
      },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    console.log("💳 Processing checkout.session.completed event");
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
      console.log("✅ Order created in Sanity successfully");
    } catch (error) {
      console.error("Error creating order in sanity:", error);
      return NextResponse.json(
        {
          error: `Error creating order: ${error}`,
        },
        { status: 400 }
      );
    }
  } else {
    console.log("ℹ️ Webhook event type not handled:", event.type);
  }
  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId, address } =
    metadata as unknown as Metadata & { address: string };
  const parsedAddress = address ? JSON.parse(address) : null;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );

  // Create Sanity product references and prepare stock updates
  const sanityProducts = [];
  const stockUpdates = [];
  for (const item of lineItemsWithProduct.data) {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;

    if (!productId) continue;

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });
    stockUpdates.push({ productId, quantity });
  }
  //   Create order in Sanity

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,

    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  });

  // Update stock levels in Sanity

  await updateStockLevels(stockUpdates);

  // Send order confirmation email
  try {
    console.log("🚀 Attempting to send order confirmation email to:", customerEmail);
    console.log("📧 Order Number:", orderNumber);
    console.log("💰 Total Amount:", amount_total ? amount_total / 100 : 0);
    
    await sendOrderConfirmationEmail({
      orderNumber,
      customerName,
      customerEmail,
      products: lineItemsWithProduct.data,
      totalAmount: amount_total ? amount_total / 100 : 0,
      shippingAddress: parsedAddress,
    });
    
    console.log("✅ Order confirmation email sent successfully!");
  } catch (emailError) {
    console.error("❌ Failed to send order confirmation email:", emailError);
    console.error("Error details:", JSON.stringify(emailError, null, 2));
  }

  return order;
}

// Function to update stock levels
async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      // Fetch current stock
      const product = await backendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`
        );
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0); // Ensure stock does not go negative

      // Update stock in Sanity
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
}

// Function to send order confirmation email
interface OrderEmailParams {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  products: Stripe.LineItem[];
  totalAmount: number;
  shippingAddress: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  } | null;
}

async function sendOrderConfirmationEmail({
  orderNumber,
  customerName,
  customerEmail,
  products,
  totalAmount,
  shippingAddress,
}: OrderEmailParams) {
  console.log("📨 sendOrderConfirmationEmail function called");
  console.log("Customer Email:", customerEmail);
  console.log("Order Number:", orderNumber);
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  
  // Calculate subtotal and discount
  const subtotal = products.reduce((sum, item) => sum + ((item.amount_subtotal || item.amount_total || 0) / 100), 0);
  const discount = products.reduce((sum, item) => sum + ((item.amount_discount || 0) / 100), 0);
  
  console.log("Subtotal:", subtotal, "Discount:", discount, "Total:", totalAmount);
  
  const productRows = products
    .map((item) => {
      const product = item.price?.product as Stripe.Product;
      const unitPrice = ((item.amount_subtotal || item.amount_total || 0) / 100) / (item.quantity || 1);
      const lineTotal = ((item.amount_total || 0) / 100);
      return `
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid #eee;">
            <strong>${product?.name || item.description || "Product"}</strong>
            <div style="color: #666; font-size: 13px; font-weight: normal;">$${unitPrice.toFixed(2)} each</div>
          </td>
          <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: right;">
            $${lineTotal.toFixed(2)}
          </td>
        </tr>
      `;
    })
    .join("");

  console.log("🔄 Sending email via Resend...");
  
  const result = await resend.emails.send({
    from: "Shop Matrix <onboarding@resend.dev>",
    to: [customerEmail],
    subject: `Order Confirmation #${orderNumber} - Shop Matrix`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e2768; padding: 30px 20px; text-align: center;">
          <h1 style="color: #3ab8a3; margin: 0;">Shop Matrix</h1>
          <p style="color: white; margin-top: 10px;">Order Confirmation</p>
        </div>
        
        <div style="padding: 30px; background: #f5f5f5;">
          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h2 style="color: #155724; margin: 0;">✓ Order Placed Successfully!</h2>
          </div>
          
          <p>Hi ${customerName},</p>
          <p>Thank you for your order! We're excited to get your items to you.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e2768; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> #${orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Product</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6;">Qty</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${productRows}
              </tbody>
            </table>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Subtotal:</td>
                  <td style="text-align: right; padding: 8px 0; color: #666;">$${subtotal.toFixed(2)}</td>
                </tr>
                ${discount > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #28a745;">Discount:</td>
                  <td style="text-align: right; padding: 8px 0; color: #28a745;">-$${discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr style="font-size: 18px; font-weight: bold; border-top: 2px solid #eee;">
                  <td style="padding: 15px 0 10px 0;">Total Amount:</td>
                  <td style="text-align: right; padding: 15px 0 10px 0; color: #3ab8a3;">$${totalAmount.toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </div>
          
          ${shippingAddress ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e2768; margin-top: 0;">Shipping Address</h3>
            <p style="margin: 0; line-height: 1.8;">
              ${shippingAddress.name || customerName}<br>
              ${shippingAddress.address || ""}<br>
              ${shippingAddress.city || ""}, ${shippingAddress.state || ""} ${shippingAddress.zip || ""}
            </p>
          </div>
          ` : ""}
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e2768; margin-top: 0;">What's Next?</h3>
            <ol style="line-height: 2; padding-left: 20px;">
              <li>We'll process your order within 1-2 business days</li>
              <li>You'll receive a shipping confirmation email with tracking info</li>
              <li>Your package will arrive within 5-7 business days</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000/orders" 
               style="background: #3ab8a3; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
              Track Your Order
            </a>
            <a href="http://localhost:3000" 
               style="background: #161d53; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Shop More
            </a>
          </div>
          
          <p style="margin-top: 30px; color: #666;">
            If you have any questions about your order, please contact our support team at 
            <a href="mailto:support@shopmatrix.com" style="color: #3ab8a3;">support@shopmatrix.com</a> 
            or call us at +1 (504) 958-6485.
          </p>
        </div>
        
        <div style="background: #1e2768; padding: 20px; text-align: center;">
          <p style="color: #3ab8a3; margin: 0 0 10px 0; font-size: 16px;">Thank you for shopping with Shop Matrix!</p>
          <p style="color: white; margin: 10px 0; font-size: 14px;">- The Shop Matrix Team</p>
          <p style="color: #999; margin: 0; font-size: 12px;">
            © 2025 Shop Matrix. All rights reserved.<br>
            New Orleans, USA
          </p>
        </div>
      </div>
    `,
  });
  
  console.log("✅ Resend API response:", result);
  return result;
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  products: OrderProduct[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderDetails: OrderDetails = await request.json();

    if (!orderDetails.customerEmail || !orderDetails.orderId) {
      return NextResponse.json(
        { error: "Customer email and order ID are required" },
        { status: 400 }
      );
    }

    const productRows = orderDetails.products
      .map(
        (product) => `
        <tr>
          <td style="padding: 15px; border-bottom: 1px solid #eee;">
            <strong>${product.name}</strong>
          </td>
          <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: center;">
            ${product.quantity}
          </td>
          <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: right;">
            $${(product.price * product.quantity).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join("");

    // Send order confirmation email to customer
    await resend.emails.send({
      from: "Shop Matrix <onboarding@resend.dev>",
      to: [orderDetails.customerEmail],
      subject: `Order Confirmation #${orderDetails.orderId} - Shop Matrix`,
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
            
            <p>Hi ${orderDetails.customerName},</p>
            <p>Thank you for your order! We're excited to get your items to you.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e2768; margin-top: 0;">Order Details</h3>
              <p><strong>Order Number:</strong> #${orderDetails.orderId}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
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
                    <td style="padding: 5px 0;">Subtotal:</td>
                    <td style="text-align: right;">$${orderDetails.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">Shipping:</td>
                    <td style="text-align: right;">${orderDetails.shipping === 0 ? "FREE" : `$${orderDetails.shipping.toFixed(2)}`}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">Tax:</td>
                    <td style="text-align: right;">$${orderDetails.tax.toFixed(2)}</td>
                  </tr>
                  <tr style="font-size: 18px; font-weight: bold;">
                    <td style="padding: 10px 0; border-top: 2px solid #1e2768;">Total:</td>
                    <td style="text-align: right; padding: 10px 0; border-top: 2px solid #1e2768; color: #3ab8a3;">$${orderDetails.total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e2768; margin-top: 0;">Shipping Address</h3>
              <p style="margin: 0; line-height: 1.8;">
                ${orderDetails.customerName}<br>
                ${orderDetails.shippingAddress.line1}<br>
                ${orderDetails.shippingAddress.line2 ? orderDetails.shippingAddress.line2 + "<br>" : ""}
                ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.postalCode}<br>
                ${orderDetails.shippingAddress.country}
              </p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e2768; margin-top: 0;">What's Next?</h3>
              <ol style="line-height: 2; padding-left: 20px;">
                <li>We'll process your order within 1-2 business days</li>
                <li>You'll receive a shipping confirmation email with tracking info</li>
                <li>Your package will arrive within 5-7 business days</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://shopmatrix.com/orders" 
                 style="background: #3ab8a3; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Track Your Order
              </a>
            </div>
            
            <p style="margin-top: 30px; color: #666;">
              If you have any questions about your order, please contact our support team at 
              <a href="mailto:support@shopmatrix.com" style="color: #3ab8a3;">support@shopmatrix.com</a> 
              or call us at +1 (504) 958-6485.
            </p>
          </div>
          
          <div style="background: #1e2768; padding: 20px; text-align: center;">
            <p style="color: #3ab8a3; margin: 0 0 10px 0;">Thank you for shopping with us!</p>
            <p style="color: #666; margin: 0; font-size: 12px;">
              © 2025 Shop Matrix. All rights reserved.<br>
              123 Tech Street, New Orleans, LA 70112
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Order confirmation email sent successfully" 
    });
  } catch (error) {
    console.error("Order confirmation email error:", error);
    return NextResponse.json(
      { error: "Failed to send order confirmation email" },
      { status: 500 }
    );
  }
}

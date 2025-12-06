import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    console.log("📧 Order confirmation email API called");

    const { orderNumber, customerEmail, customerName, cartItems } = await req.json();

    if (!customerEmail) {
      return NextResponse.json(
        { success: false, error: "Customer email is required" },
        { status: 400 }
      );
    }

    console.log("📨 Sending to:", customerEmail);
    console.log("🔢 Order Number:", orderNumber);
    console.log("🛒 Cart Items:", cartItems?.length || 0);

    // Calculate totals
    let subtotal = 0;
    let totalDiscount = 0;
    
    const itemsHtml = cartItems?.map((item: { product: { price?: number; regularPrice?: number; name?: string; images?: unknown[]; variant?: string }; quantity?: number }) => {
      const product = item.product;
      const quantity = item.quantity || 1;
      const price = product.price || 0;
      const regularPrice = product.regularPrice || price;
      const discount = (regularPrice - price) * quantity;
      const itemTotal = price * quantity;
      
      subtotal += itemTotal;
      totalDiscount += discount;
      
      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 18px 12px; text-align: left;">
            <strong style="color: #161d53;">${product.name}</strong><br>
            <span style="color: #6b7280; font-size: 13px;">${product.variant || 'Standard'}</span>
          </td>
          <td style="padding: 18px 12px; text-align: center; color: #374151;">₹${price.toFixed(2)}</td>
          <td style="padding: 18px 12px; text-align: center; color: #374151;">${quantity}</td>
          <td style="padding: 18px 12px; text-align: right; color: #161d53; font-weight: 600;">₹${itemTotal.toFixed(2)}</td>
        </tr>
      `;
    }).join('') || '';

    const total = subtotal;
    const orderDate = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const mailOptions = {
      from: `"Shop Matrix" <${process.env.EMAIL_FROM}>`,
      to: customerEmail,
      subject: `Order Invoice #${orderNumber.slice(0, 8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'Segoe UI', Arial, sans-serif;
                line-height: 1.8;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f3f4f6;
              }
              .email-container {
                max-width: 700px;
                margin: 30px auto;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
              }
              .header {
                background-color: #161d53;
                padding: 40px 40px;
                text-align: center;
              }
              .logo {
                color: #3ab8a3;
                font-size: 32px;
                font-weight: bold;
                margin: 0;
              }
              .tagline {
                color: #ffffff;
                font-size: 14px;
                margin: 5px 0 0 0;
              }
              .success-badge {
                background-color: #3ab8a3;
                color: white;
                padding: 20px 30px;
                text-align: center;
                font-size: 18px;
                font-weight: 600;
              }
              .content {
                padding: 45px;
              }
              .invoice-title {
                color: #161d53;
                font-size: 24px;
                font-weight: bold;
                margin: 0 0 10px 0;
              }
              .invoice-info {
                display: flex;
                justify-content: space-between;
                margin: 25px 0 35px 0;
                padding: 25px;
                background-color: #f9fafb;
                border-left: 4px solid #3ab8a3;
              }
              .info-block {
                flex: 1;
              }
              .info-label {
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .info-value {
                color: #161d53;
                font-size: 14px;
                font-weight: 600;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 35px 0;
              }
              th {
                background-color: #161d53;
                color: white;
                padding: 15px 12px;
                text-align: left;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              th:nth-child(2), th:nth-child(3) {
                text-align: center;
              }
              th:last-child {
                text-align: right;
              }
              .totals-section {
                margin-top: 25px;
                border-top: 2px solid #e5e7eb;
                padding-top: 25px;
              }
              .total-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                font-size: 14px;
              }
              .total-row.grand {
                background-color: #161d53;
                color: white;
                padding: 15px 20px;
                margin-top: 10px;
                font-size: 18px;
                font-weight: bold;
              }
              .discount-row {
                color: #3ab8a3;
                font-weight: 600;
              }
              .button {
                display: inline-block;
                padding: 14px 40px;
                background-color: #3ab8a3;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
                text-align: center;
              }
              .footer {
                background-color: #f9fafb;
                padding: 35px 40px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
              }
              .footer-text {
                color: #6b7280;
                font-size: 13px;
                margin: 5px 0;
              }
              .divider {
                border: 0;
                height: 1px;
                background: #e5e7eb;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <!-- Header -->
              <div class="header">
                <h1 class="logo">SHOP MATRIX</h1>
                <p class="tagline">Your Premium Shopping Destination</p>
              </div>

              <!-- Success Badge -->
              <div class="success-badge">
                ✓ Order Confirmed
              </div>

              <!-- Content -->
              <div class="content">
                <p style="color: #374151; font-size: 15px; margin-bottom: 10px;">
                  Dear ${customerName},
                </p>
                <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                  Thank you for shopping with <strong style="color: #3ab8a3;">Shop Matrix</strong>! 
                  Your order has been confirmed and is being processed. Below is your order invoice.
                </p>

                <!-- Invoice Info -->
                <div class="invoice-info">
                  <div class="info-block">
                    <div class="info-label">Invoice Number</div>
                    <div class="info-value">#${orderNumber.slice(0, 8).toUpperCase()}</div>
                  </div>
                  <div class="info-block">
                    <div class="info-label">Order Date</div>
                    <div class="info-value">${orderDate}</div>
                  </div>
                  <div class="info-block">
                    <div class="info-label">Customer Email</div>
                    <div class="info-value">${customerEmail}</div>
                  </div>
                </div>

                <h2 class="invoice-title">Order Summary</h2>

                <!-- Order Items Table -->
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>

                <!-- Totals -->
                <div class="totals-section">
                  <div class="total-row">
                    <span style="color: #6b7280;">Subtotal:</span>
                    <span style="color: #374151; font-weight: 600;">₹${subtotal.toFixed(2)}</span>
                  </div>
                  ${totalDiscount > 0 ? `
                  <div class="total-row discount-row">
                    <span>Discount Applied:</span>
                    <span>- ₹${totalDiscount.toFixed(2)}</span>
                  </div>
                  ` : ''}
                  <div class="total-row">
                    <span style="color: #6b7280;">Shipping:</span>
                    <span style="color: #3ab8a3; font-weight: 600;">FREE</span>
                  </div>
                  <div class="total-row grand">
                    <span>TOTAL AMOUNT</span>
                    <span>₹${total.toFixed(2)}</span>
                  </div>
                </div>

                <hr class="divider">

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}" class="button">Shop More</a>
                </div>

                <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #161d53;">What's Next?</strong><br>
                  • Your order is being prepared for shipment<br>
                  • You'll receive a tracking number via email once shipped<br>
                  • Expected delivery: 5-7 business days
                </p>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p style="color: #161d53; font-weight: 600; font-size: 16px; margin: 0 0 10px 0;">
                  SHOP MATRIX
                </p>
                <p class="footer-text">
                  Thank you for choosing Shop Matrix!
                </p>
                <p class="footer-text">
                  Questions? Contact us at ${process.env.EMAIL_FROM}
                </p>
                <p class="footer-text" style="font-size: 11px; color: #9ca3af; margin-top: 15px;">
                  This is an automated email. Please do not reply to this message.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Order confirmation email sent:", info.messageId);
    console.log("📬 Accepted:", info.accepted);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: "Order confirmation email sent successfully",
    });
  } catch (err) {
    console.error("❌ Error sending order confirmation email:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send order confirmation email",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

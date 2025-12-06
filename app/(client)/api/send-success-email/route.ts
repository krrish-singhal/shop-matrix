import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Send success email API called");
    
    const { orderNumber, customerEmail, customerName } = await request.json();

    console.log("Order Number:", orderNumber);
    console.log("Customer Email:", customerEmail);
    console.log("Customer Name:", customerName);

    if (!orderNumber || !customerEmail) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { error: "Order number and customer email are required" },
        { status: 400 }
      );
    }

    // Send a simplified confirmation email without waiting for Sanity
    console.log("📨 Sending email via Resend...");
    
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
              
              <p style="margin-top: 20px; color: #666;">
                Your order has been confirmed and is being processed. You can view the complete order details in your account.
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
              <a href="http://localhost:3000/orders" 
                 style="background: #3ab8a3; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 10px;">
                View Your Orders
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

    console.log("✅ Email sent successfully!");
    console.log("Resend response:", result);

    return NextResponse.json({
      success: true,
      message: "Order confirmation email sent",
      emailId: result.data?.id,
    });
  } catch (error) {
    console.error("❌ Error in send-success-email API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { auth, currentUser } from "@clerk/nextjs/server";

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
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: "You must be logged in to submit feedback" },
        { status: 401 }
      );
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    const userName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.firstName || user.username || "Customer";

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const { feedback, rating } = await req.json();

    if (!feedback || !rating) {
      return NextResponse.json(
        { error: "Feedback and rating are required" },
        { status: 400 }
      );
    }

    console.log("📧 Sending feedback email from:", userEmail, "to: krrishsinghal22@gmail.com");

    // Send feedback email to admin
    const mailOptions = {
      from: `"${userName}" <${process.env.EMAIL_FROM}>`,
      to: "krrishsinghal22@gmail.com",
      replyTo: userEmail,
      subject: `New Customer Feedback - ${rating} Star${rating !== 1 ? 's' : ''} from ${userName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .email-container {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #161d53 0%, #3ab8a3 100%);
                color: white;
                padding: 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                padding: 30px;
              }
              .customer-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 25px;
                border-left: 4px solid #161d53;
              }
              .customer-info h3 {
                margin: 0 0 15px 0;
                color: #161d53;
                font-size: 18px;
              }
              .info-row {
                margin: 8px 0;
                display: flex;
                align-items: center;
              }
              .info-label {
                font-weight: 600;
                color: #555;
                min-width: 80px;
              }
              .info-value {
                color: #333;
              }
              .rating-section {
                text-align: center;
                margin: 25px 0;
                padding: 20px;
                background: #fff9e6;
                border-radius: 8px;
              }
              .rating {
                font-size: 40px;
                margin: 10px 0;
                letter-spacing: 4px;
              }
              .rating-text {
                font-size: 18px;
                font-weight: 600;
                color: #161d53;
                margin-top: 10px;
              }
              .feedback-box {
                background: #f8f9fa;
                padding: 25px;
                border-left: 4px solid #3ab8a3;
                border-radius: 4px;
                margin: 25px 0;
              }
              .feedback-box h3 {
                margin: 0 0 15px 0;
                color: #161d53;
                font-size: 18px;
              }
              .feedback-text {
                color: #333;
                line-height: 1.8;
                white-space: pre-wrap;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #666;
                font-size: 13px;
              }
              .footer p {
                margin: 5px 0;
              }
              .reply-hint {
                background: #e8f5f3;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                text-align: center;
                color: #2d9a87;
                font-weight: 500;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>📬 New Customer Feedback</h1>
              </div>
              <div class="content">
                <div class="customer-info">
                  <h3>👤 Customer Information</h3>
                  <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${userName}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${userEmail}" style="color: #3ab8a3; text-decoration: none;">${userEmail}</a></span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">User ID:</span>
                    <span class="info-value">${userId}</span>
                  </div>
                </div>
                
                <div class="rating-section">
                  <h3 style="margin-top: 0; color: #161d53;">⭐ Customer Rating</h3>
                  <div class="rating">
                    ${'⭐'.repeat(rating)}${rating < 5 ? '☆'.repeat(5 - rating) : ''}
                  </div>
                  <div class="rating-text">${rating} out of 5 stars</div>
                </div>
                
                <div class="feedback-box">
                  <h3>💬 Feedback Message</h3>
                  <div class="feedback-text">${feedback.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="reply-hint">
                  💡 Click "Reply" to respond directly to ${userName}
                </div>
                
                <div class="footer">
                  <p><strong>Received from ShopMatrix Website</strong></p>
                  <p>📅 ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Feedback email sent successfully!");

    return NextResponse.json(
      { message: "Feedback sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending feedback:", error);
    return NextResponse.json(
      { error: "Failed to send feedback. Please try again." },
      { status: 500 }
    );
  }
}

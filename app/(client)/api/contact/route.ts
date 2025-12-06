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

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("📧 Sending contact form email from:", email, "to: krrishsinghal22@gmail.com");

    // Send email to admin
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: "krrishsinghal22@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
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
              .contact-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 25px;
                border-left: 4px solid #161d53;
              }
              .contact-info h3 {
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
              .subject-box {
                background: #fff9e6;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #fbbf24;
              }
              .subject-box h3 {
                margin: 0 0 10px 0;
                color: #161d53;
                font-size: 16px;
              }
              .message-box {
                background: #f8f9fa;
                padding: 25px;
                border-left: 4px solid #3ab8a3;
                border-radius: 4px;
                margin: 25px 0;
              }
              .message-box h3 {
                margin: 0 0 15px 0;
                color: #161d53;
                font-size: 18px;
              }
              .message-text {
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
                <h1>📬 New Contact Form Message</h1>
              </div>
              <div class="content">
                <div class="contact-info">
                  <h3>👤 Contact Information</h3>
                  <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${name}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:${email}" style="color: #3ab8a3; text-decoration: none;">${email}</a></span>
                  </div>
                </div>
                
                <div class="subject-box">
                  <h3>📋 Subject</h3>
                  <div style="color: #333; font-weight: 500;">${subject}</div>
                </div>
                
                <div class="message-box">
                  <h3>💬 Message</h3>
                  <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="reply-hint">
                  💡 Click "Reply" to respond directly to ${name}
                </div>
                
                <div class="footer">
                  <p><strong>Received from ShopMatrix Contact Form</strong></p>
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
    console.log("✅ Contact form email sent successfully!");

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

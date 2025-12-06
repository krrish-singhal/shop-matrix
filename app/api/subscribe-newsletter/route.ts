import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { client } from "@/sanity/lib/client";

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
    console.log("📧 Newsletter subscription API called");

    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("📨 Subscribing:", email);

    // Store subscriber in Sanity (optional - you can create a newsletter schema)
    try {
      await client.create({
        _type: "newsletter",
        email: email,
        name: name || "Subscriber",
        subscribedAt: new Date().toISOString(),
        status: "active",
      });
      console.log("✅ Subscriber saved to Sanity");
    } catch (sanityError) {
      console.log("⚠️ Could not save to Sanity (schema might not exist):", sanityError);
      // Continue anyway - email is more important
    }

    // Send welcome email
    const mailOptions = {
      from: `"Shop Matrix" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🎉 Welcome to Shop Matrix Newsletter!",
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
                max-width: 650px;
                margin: 30px auto;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
              }
              .header {
                background-color: #161d53;
                padding: 40px;
                text-align: center;
              }
              .logo {
                color: #3ab8a3;
                font-size: 36px;
                font-weight: bold;
                margin: 0;
                letter-spacing: 1px;
              }
              .tagline {
                color: #ffffff;
                font-size: 14px;
                margin: 8px 0 0 0;
              }
              .welcome-banner {
                background-color: #3ab8a3;
                color: white;
                padding: 25px 30px;
                text-align: center;
              }
              .welcome-title {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
              }
              .content {
                padding: 45px;
              }
              .greeting {
                color: #161d53;
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 20px 0;
              }
              .benefit-box {
                background-color: #f9fafb;
                border-left: 4px solid #3ab8a3;
                padding: 20px;
                margin: 25px 0;
              }
              .benefit-item {
                display: flex;
                align-items: flex-start;
                margin: 12px 0;
              }
              .benefit-icon {
                color: #3ab8a3;
                font-size: 20px;
                margin-right: 12px;
                flex-shrink: 0;
              }
              .benefit-text {
                color: #374151;
                font-size: 15px;
                line-height: 1.6;
              }
              .promo-box {
                background-color: #161d53;
                color: white;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
                border-radius: 8px;
              }
              .promo-code {
                background-color: #3ab8a3;
                color: white;
                padding: 15px 30px;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 2px;
                display: inline-block;
                margin: 15px 0;
                border-radius: 5px;
                font-family: monospace;
              }
              .button {
                display: inline-block;
                padding: 15px 40px;
                background-color: #3ab8a3;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin: 20px 0;
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
                margin: 8px 0;
              }
              .social-links {
                margin: 20px 0;
              }
              .social-link {
                display: inline-block;
                margin: 0 10px;
                color: #3ab8a3;
                text-decoration: none;
                font-weight: 600;
              }
              .divider {
                border: 0;
                height: 1px;
                background: #e5e7eb;
                margin: 25px 0;
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

              <!-- Welcome Banner -->
              <div class="welcome-banner">
                <p class="welcome-title">🎉 Welcome to Our Community!</p>
              </div>

              <!-- Content -->
              <div class="content">
                <p class="greeting">Hey ${name || "there"}! 👋</p>
                
                <p style="color: #374151; font-size: 15px; line-height: 1.7;">
                  Thanks for signing up! You're officially part of the Shop Matrix family now, 
                  and trust me – you're going to love what's coming your way.
                </p>

                <!-- Benefits -->
                <div class="benefit-box">
                  <p style="color: #161d53; font-weight: 600; margin: 0 0 15px 0;">
                    Here's what you can expect from us:
                  </p>
                  
                  <div class="benefit-item">
                    <span class="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ab8a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                      </svg>
                    </span>
                    <span class="benefit-text"><strong>Hot Deals First</strong> – We'll ping you before anyone else knows about our sales</span>
                  </div>
                  
                  <div class="benefit-item">
                    <span class="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ab8a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
                      </svg>
                    </span>
                    <span class="benefit-text"><strong>Fresh Arrivals</strong> – Get a heads-up when we drop new products</span>
                  </div>
                  
                  <div class="benefit-item">
                    <span class="benefit-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ab8a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                        <path d="M9 18h6"/>
                        <path d="M10 22h4"/>
                      </svg>
                    </span>
                    <span class="benefit-text"><strong>Smart Tips</strong> – Helpful product guides and buying advice (no fluff)</span>
                  </div>
                  
                  <div class="benefit-item">
                    <span class="benefit-icon">🎯</span>
                    <span class="benefit-text"><strong>Special Occasions</strong> – Birthday surprises and holiday deals just for you</span>
                  </div>
                </div>

                <!-- Welcome Discount -->
                <div class="promo-box">
                  <p style="margin: 0 0 10px 0; font-size: 16px;">
                    🎊 Here's a little welcome gift!
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #e5e7eb;">
                    Grab <strong>10% OFF</strong> your first purchase
                  </p>
                  <div class="promo-code">WELCOME10</div>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #d1d5db;">
                    Just use this code at checkout • Good for 30 days
                  </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/shop" class="button">Browse Our Store</a>
                </div>

                <hr class="divider">

                <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #161d53;">What to expect?</strong><br>
                  We'll send you handpicked deals, fresh product drops, and exclusive offers (subscriber-only stuff). 
                  No spam, just the good stuff!
                </p>

                <p style="color: #6b7280; font-size: 13px; margin-top: 25px;">
                  Changed your mind? You can unsubscribe anytime – no hard feelings!
                </p>
              </div>

              <!-- Footer -->
              <div class="footer">
                <p style="color: #161d53; font-weight: 600; font-size: 16px; margin: 0 0 15px 0;">
                  SHOP MATRIX
                </p>
                
                <div class="social-links">
                  <a href="#" class="social-link">Facebook</a>
                  <a href="#" class="social-link">Instagram</a>
                  <a href="#" class="social-link">Twitter</a>
                </div>

                <p class="footer-text">
                  Questions? Contact us at ${process.env.EMAIL_FROM}
                </p>
                
                <p class="footer-text" style="font-size: 11px; color: #9ca3af; margin-top: 20px;">
                  © ${new Date().getFullYear()} Shop Matrix. All rights reserved.<br>
                  You're receiving this because you subscribed to our newsletter.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Welcome email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: "Successfully subscribed to newsletter",
    });
  } catch (err) {
    console.error("❌ Error in newsletter subscription:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

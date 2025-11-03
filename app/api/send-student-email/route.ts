import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientEmail, recipientName, subject, message } = body;

    // Validate required fields
    if (!recipientEmail || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: recipientEmail, subject, or message' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #DC2626; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Message from Newsline Training Agency</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0; margin-bottom: 20px;">${subject}</h2>
            <div style="line-height: 1.8; color: #4b5563; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; background-color: #1f2937; color: white;">
          <p style="margin: 0; font-size: 14px; font-weight: bold;">Newsline Training Agency</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #9ca3af;">
            This message was sent by an administrator. Please contact us if you have any questions.
          </p>
        </div>
      </div>
    `;

    // Send email to student
    await transporter.sendMail({
      from: `"Newsline Training Agency" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: subject,
      html: emailContent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully to ' + recipientEmail
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}

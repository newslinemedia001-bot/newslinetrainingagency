import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'category', 'institution', 'course', 'yearOfStudy', 'availability', 'duration', 'coverLetter', 'applicationId'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Send email notification
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
          <h1 style="color: white; margin: 0;">New Attachment Application</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Applicant Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong>Full Name:</strong> ${body.fullName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${body.email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${body.phone}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #DC2626; margin-top: 0;">Application Details</h3>
            <p style="margin: 10px 0;"><strong>Category:</strong> ${body.category}</p>
            ${body.subcategory ? `<p style="margin: 10px 0;"><strong>Subcategory:</strong> ${body.subcategory}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Institution:</strong> ${body.institution}</p>
            <p style="margin: 10px 0;"><strong>Course:</strong> ${body.course}</p>
            <p style="margin: 10px 0;"><strong>Year of Study:</strong> ${body.yearOfStudy}</p>
            <p style="margin: 10px 0;"><strong>Available From:</strong> ${body.availability}</p>
            <p style="margin: 10px 0;"><strong>Duration:</strong> ${body.duration}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 10px;">
            <h3 style="color: #DC2626; margin-top: 0;">Cover Letter</h3>
            <p style="line-height: 1.6; color: #4b5563;">${body.coverLetter}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e;">
              <strong>Application ID:</strong> ${body.applicationId}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
        
        <div style="padding: 20px; text-align: center; background-color: #1f2937; color: white;">
          <p style="margin: 0; font-size: 14px;">Newsline Training Agency</p>
          <p style="margin: 5px 0; font-size: 12px;">This is an automated message. Please do not reply.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Attachment Application - ${body.fullName}`,
      html: emailContent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        applicationId: body.applicationId 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

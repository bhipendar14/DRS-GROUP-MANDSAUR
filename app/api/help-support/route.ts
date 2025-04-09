import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { name, email, phone, category, subject, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !phone || !category || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required for support tickets' }, 
        { status: 400 }
      );
    }
    
    // Log email credentials for debugging (without showing full password)
    console.log('Email configuration:', {
      user: process.env.EMAIL_USER,
      passwordProvided: !!process.env.EMAIL_PASSWORD
    });
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Set up email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dsrgroupmandsaur@gmail.com',
      subject: `Help & Support: ${category} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #6b46c1; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Support Ticket</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 130px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6b46c1;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Category:</td>
              <td style="padding: 8px 0;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0;">${message}</td>
            </tr>
          </table>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 14px; color: #666;">
            <p style="margin: 0;">This email was sent automatically from the DSR Group help & support page.</p>
            <p style="margin: 5px 0 0 0;">Submitted on: ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</p>
          </div>
        </div>
      `
    };
    
    // Send email and wait for result
    console.log('Sending support email to:', mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log('Support email sent successfully:', info.messageId);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Your support request has been submitted successfully' 
    });
    
  } catch (error) {
    // Log and return error
    console.error('Support email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send support request. Please try again later.',
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 
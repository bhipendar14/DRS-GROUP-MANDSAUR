import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, email, queryType, message } = await request.json();

    // Validate required fields
    if (!name || !phone || !email || !queryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Add verification
    try {
      await transporter.verify();
    } catch (error: any) {
      console.error('Email verification failed:', error);
      return NextResponse.json(
        { error: `Email configuration error: ${error?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Prepare email content for recipient (DSR Group)
    const mailOptionsToRecipient = {
      from: process.env.EMAIL_USER,
      to: 'bhipendarkumar31@gmail.com',
      subject: `DSR Group Contact Form: ${queryType} Query`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query Type:</strong> ${queryType}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `,
    };

    // Prepare confirmation email for sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting DSR Group',
      html: `
        <h1>Thank you for contacting DSR Group</h1>
        <p>Dear ${name},</p>
        <p>We have received your ${queryType} query and will get back to you shortly.</p>
        <p>Here's what you submitted:</p>
        <p><strong>Query Type:</strong> ${queryType}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        <br>
        <p>If you have any additional questions, please click here to email us directly: 
          <a href="mailto:bhipendarkumar31@gmail.com?subject=RE: ${queryType} Query">Send Email</a>
        </p>
        <br>
        <p>Best regards,</p>
        <p>DSR Group Team</p>
      `,
    };

    // Send both emails with better error handling
    try {
      const results = await Promise.all([
        transporter.sendMail(mailOptionsToRecipient),
        transporter.sendMail(mailOptionsToSender)
      ]);
      console.log('Email sent successfully:', results);
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error('Failed to send email, detailed error:', error);
      return NextResponse.json(
        { error: `Failed to send email: ${error?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 
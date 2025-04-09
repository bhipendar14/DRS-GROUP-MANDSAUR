import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, email, queryType, message } = await req.json();
    
    // Input validation
    if (!name || !email || !phone || !queryType) {
      return NextResponse.json(
        { error: 'Name, email, phone and query type are required' }, 
        { status: 400 }
      );
    }
    
    // Configure transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name} - ${queryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; width: 30%;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Query Type:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${queryType}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px 0; vertical-align: top; font-weight: bold;">Message:</td>
              <td style="padding: 10px 0;">${message.replace(/\n/g, '<br>')}</td>
            </tr>` : ''}
          </table>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">This message was sent from the DSR GROUP MANDSAUR contact form.</p>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' }, 
      { status: 500 }
    );
  }
} 
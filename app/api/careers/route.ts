import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeFile = formData.get('resume') as File;
    
    // Validate required fields
    if (!name || !email || !phone || !position || !experience || !resumeFile) {
      return NextResponse.json(
        { error: 'All required fields must be filled' }, 
        { status: 400 }
      );
    }
    
    // Check file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' }, 
        { status: 400 }
      );
    }
    
    // Save file to temp directory
    const tempDir = os.tmpdir();
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${name.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
    const filePath = path.join(tempDir, fileName);
    
    const fileArrayBuffer = await resumeFile.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    
    await writeFile(filePath, fileBuffer);
    
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
      subject: `New Job Application - ${position} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Job Application</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; width: 30%;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Phone Number:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Position:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${position}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold;">Experience:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${experience}</td>
            </tr>
            ${coverLetter ? `
            <tr>
              <td style="padding: 10px 0; vertical-align: top; font-weight: bold;">Cover Letter:</td>
              <td style="padding: 10px 0;">${coverLetter.replace(/\n/g, '<br>')}</td>
            </tr>` : ''}
          </table>
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">Resume is attached to this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: resumeFile.name,
          path: filePath
        }
      ]
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' }, 
      { status: 500 }
    );
  }
}

// Increase payload size limit for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}; 
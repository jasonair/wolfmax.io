import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store in Firebase (optional but good for records)
    try {
      await addDoc(collection(db, 'contact-submissions'), {
        name,
        email: email.toLowerCase(),
        subject: subject || 'No subject',
        message,
        createdAt: new Date().toISOString(),
        source: 'contact-form',
      });
    } catch (firebaseError) {
      // Log but don't fail if Firebase has issues
      console.error('Firebase storage error:', firebaseError);
    }

    // Send email via Resend
    const recipientEmail = process.env.CONTACT_EMAIL || 'your-email@example.com';
    
    const { data, error } = await resend.emails.send({
      from: 'Wolfmax Contact <onboarding@resend.dev>', // Works in dev/test mode without DNS verification
      to: recipientEmail,
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This email was sent from the Wolfmax contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


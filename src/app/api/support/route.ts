import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, subject, category, orderNumber, message } = await req.json();

  // Basic validation
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'ValueBox Support <noreply@valuebox.io>',
      to: process.env.SUPPORT_EMAIL!,
      replyTo: email,
      subject: `[Support] ${subject}`,
      html: `
        <h2>New Support Request</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Category:</strong></td><td>${category || 'General'}</td></tr>
          ${orderNumber ? `<tr><td><strong>Order #:</strong></td><td>${orderNumber}</td></tr>` : ''}
          <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
        </table>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Sent from ValueBox Support Center</small>
      `,
    });

    // Also send confirmation to the customer
    await resend.emails.send({
      from: 'ValueBox Support <support@valuebox.io>',
      to: email,
      subject: 'We received your message — ValueBox Support',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! We've received your support request and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
        <p>In the meantime, you can browse our <a href="https://valuebox.io/support">Help Center</a> for quick answers.</p>
        <br>
        <p>The ValueBox Support Team<br>support@valuebox.io</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

import { contactSchema } from "@/lib/validation";
import nodemailer from "nodemailer";
import { z } from "zod";
// Define validation schema

export async function POST(req) {
  try {
    // Validate input data
    const rawData = await req.json();
    const { firstName, lastName, email, phone, service, message } =
      contactSchema.parse(rawData);

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email options
    const adminMailOptions = {
      from: `${firstName} ${lastName} <${email}>`,
      to: process.env.EMAIL_TO,
      replyTo: `${firstName} ${lastName} <${email}>`,
      subject: `New contact form submission from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    // Prepare user confirmation email (preserving your exact body style)
    const userMailOptions = {
      from: `"Ayon Bit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for your message!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
            <h2 style="color: #444;">Hello ${firstName},</h2>
            <p style="font-size: 16px;">Thank you for reaching out to us! I wanted to let you know that I have received your message and will be reviewing it shortly.</p>
            <p style="font-size: 16px;">I'm dedicated to providing you with the best possible support and will get back to you as soon as possible with the answers you need.</p>
            <p style="font-size: 16px;">If you have any additional information to share or if your inquiry is urgent, feel free to reply to this email, and I'll prioritize your request.</p>
            <p style="font-size: 16px;">I appreciate your patience and look forward to assisting you.</p>
            <p style="font-size: 16px; font-weight: bold;">Best regards,</p>
            <h3 style="color: #444;">Ayon Bit</h3>
            <p style="font-size: 14px; color: #777;">Full-Stack Developer | Incognito Solution</p>
            <p style="font-size: 14px; color: #777;">Website: <a href="https://ayonbit.me" style="color: #1e90ff;">https://ayonbit.me</a></p>
          </div>
        </div>
      `,
    };

    // Send confirmation to user
    await transporter.sendMail(userMailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}

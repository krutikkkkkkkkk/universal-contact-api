import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASS,
      },
    })

    // Format the data into HTML content
    const htmlContent = Object.entries(data)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("")

    // Send the email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: data.subject || "New Contact Form Submission",
      html: `<h2>New Submission</h2>${htmlContent}`,
    })

    // Return success response
    return NextResponse.json({ success: true, message: "Email sent" }, { status: 200 })
  } catch (error) {
    // Log the error and return error response
    console.error("Error:", error)
    return NextResponse.json({ success: false, message: "Email failed" }, { status: 500 })
  }
}

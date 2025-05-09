import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Enable CORS
function enableCors(response) {
  response.headers.set("Access-Control-Allow-Origin", `${process.env.ACCESS_ORIGIN}`)
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  return response
}

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

    // Return success response with CORS headers
    let successResponse = NextResponse.json({ success: true, message: "Email sent" }, { status: 200 })
    successResponse = enableCors(successResponse)
    return successResponse
  } catch (error) {
    // Log the error and return error response
    console.error("Error:", error)
    let errorResponse = NextResponse.json({ success: false, message: "Email failed" }, { status: 500 })
    errorResponse = enableCors(errorResponse)
    return errorResponse
  }
}

export async function OPTIONS() {
  // Handle preflight requests
  let response = NextResponse.json({}, { status: 204 })
  response = enableCors(response)
  return response
}

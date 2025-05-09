import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const data = await request.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASS,
      },
    })

    const htmlContent = Object.entries(data)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("")

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: data.subject || "New Contact Form Submission",
      html: `<h2>New Submission</h2>${htmlContent}`,
    })

    const response = NextResponse.json(
      { success: true, message: "Email sent" },
      { status: 200 }
    )

    response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || process.env.ACCESS_ORIGIN)
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  } catch (error) {
    console.error("Error:", error)
    const errorResponse = NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    )

    errorResponse.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || process.env.ACCESS_ORIGIN)
    errorResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    errorResponse.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return errorResponse
  }
}

// Handle CORS preflight request
export async function OPTIONS(request) {
  const response = new NextResponse(null, { status: 204 })
  response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || process.env.ACCESS_ORIGIN)
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  return response
}


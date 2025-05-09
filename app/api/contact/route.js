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

    // Return success response with CORS headers
    const successResponse = NextResponse.json({ success: true, message: "Email sent" }, { status: 200 })
    successResponse.headers.set("Access-Control-Allow-Origin", `${process.env.ACCESS_ORIGIN}`)
    successResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    successResponse.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return successResponse
  } catch (error) {
    // Log the error and return error response with CORS headers
    console.error("Error:", error)
    const errorResponse = NextResponse.json({ success: false, message: "Email failed" }, { status: 500 })
    errorResponse.headers.set("Access-Control-Allow-Origin", `${process.env.ACCESS_ORIGIN}`)
    errorResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    errorResponse.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return errorResponse
  }
}
export async function OPTIONS() {
    return NextResponse.json({ success: true, message: "CORS preflight successful" }, { status: 200 })
  }
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb", // Set the desired size limit here
    },
  },
}
export default function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.ACCESS_ORIGIN}`)
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.status(200).end()
  } else {
    res.status(405).end() // Method Not Allowed
  }
}

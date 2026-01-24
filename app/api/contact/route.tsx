import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message, to } = body

    // TODO: Integrate with your preferred email service
    // Options: Resend, SendGrid, Nodemailer, etc.
    // For now, this is a placeholder that logs the contact form data

    console.log("[v0] Contact form submission:", {
      from: email,
      name,
      to,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending
    // In production, replace this with actual email service integration
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: to,
    //   subject: `New contact from ${name}`,
    //   html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong></p><p>${message}</p>`
    // })

    return NextResponse.json({
      success: true,
      message: "Contact form received",
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ success: false, error: "Failed to process contact form" }, { status: 500 })
  }
}

import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment-specific .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: path.resolve(__dirname, envFile) })

// Fallback to .env if specific file doesn't exist
dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://thevif.com',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 6,
  message: { error: 'Too many requests, please try again later.' }
})

app.use('/api/contact', limiter)

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// Format date to Philippines timezone
function formatDatePH(date) {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date)
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      arrivalDate,
      departureDate,
      adults,
      children0to5,
      children6to16,
      message
    } = req.body

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' })
    }

    // Get current time in Philippines timezone
    const submittedAt = formatDatePH(new Date())

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f1c2e; color: #c9a962; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; }
          .content { background: #faf8f5; padding: 30px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 14px; font-weight: 600; color: #0f1c2e; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; border-bottom: 2px solid #c9a962; padding-bottom: 8px; }
          .field { margin-bottom: 12px; }
          .field-label { font-size: 12px; color: #777; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { font-size: 15px; color: #0f1c2e; margin-top: 4px; }
          .message-box { background: #fff; padding: 20px; border-left: 3px solid #c9a962; margin-top: 10px; }
          .footer { background: #0f1c2e; color: #a0a0a0; padding: 20px; text-align: center; font-size: 12px; }
          .timestamp { color: #c9a962; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>THE VIF</h1>
            <p style="margin: 10px 0 0; font-size: 14px; color: #a0a0a0;">New Inquiry Received</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Guest Details</div>
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${firstName} ${lastName}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #0f1c2e;">${email}</a></div>
              </div>
              ${phone ? `
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #0f1c2e;">${phone}</a></div>
              </div>
              ` : ''}
            </div>

            <div class="section">
              <div class="section-title">Travel Dates</div>
              <div class="field">
                <div class="field-label">Arrival Date</div>
                <div class="field-value">${arrivalDate || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="field-label">Departure Date</div>
                <div class="field-value">${departureDate || 'Not specified'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Number of Guests</div>
              <div class="field">
                <div class="field-label">Adults</div>
                <div class="field-value">${adults || '0'}</div>
              </div>
              <div class="field">
                <div class="field-label">Children (0-5 years)</div>
                <div class="field-value">${children0to5 || '0'}</div>
              </div>
              <div class="field">
                <div class="field-label">Children (6-16 years)</div>
                <div class="field-value">${children6to16 || '0'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Message</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p class="timestamp">Submitted on: ${submittedAt} (Philippines Time)</p>
            <p style="margin: 10px 0 0;">The VIF - Luxury Villa Rental</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${firstName} ${lastName} - The VIF`,
      html: emailHtml
    })

    res.json({ success: true, message: 'Your inquiry has been sent successfully!' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: formatDatePH(new Date()) })
})

// Start server
const PORT = process.env.PORT || 5101
const HOST = process.env.HOST || '100.120.0.85'

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
  console.log(`Timezone: Asia/Manila (Philippines)`)
})

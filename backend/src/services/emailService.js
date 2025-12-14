import nodemailer from 'nodemailer';
import config from '../config/index.js';
import logger from '../utils/logger.js';

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: config.email.smtp.auth,
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    logger.warn('Email service not configured:', error.message);
  } else {
    logger.info('✅ Email service ready');
  }
});

/**
 * Send email
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.email.fromName}" <${config.email.from}>`,
      to,
      subject,
      html,
      text,
    });
    
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Failed to send email:', error);
    throw error;
  }
};

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (booking, property) => {
  const subject = `Booking Confirmation - ${property.name} | The VIF`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: #fff; padding: 30px; border: 1px solid #e2e8f0; }
        .booking-details { background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #718096; font-weight: 500; }
        .value { color: #1a365d; font-weight: 600; }
        .total { font-size: 24px; color: #1a365d; text-align: center; margin: 20px 0; }
        .footer { background: #f7fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
        .btn { display: inline-block; padding: 12px 30px; background: #1a365d; color: white; text-decoration: none; border-radius: 6px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>The VIF Luxury Riviera</h1>
          <p style="margin: 10px 0 0;">Booking Confirmation</p>
        </div>
        <div class="content">
          <p>Dear ${booking.guestName},</p>
          <p>Thank you for your reservation! We're delighted to confirm your upcoming stay at <strong>${property.name}</strong>.</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #1a365d;">Reservation Details</h3>
            <div class="detail-row">
              <span class="label">Booking Reference</span>
              <span class="value">${booking.bookingRef}</span>
            </div>
            <div class="detail-row">
              <span class="label">Property</span>
              <span class="value">${property.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-in</span>
              <span class="value">${new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-out</span>
              <span class="value">${new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Guests</span>
              <span class="value">${booking.numGuests} guest${booking.numGuests > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span class="label">Nights</span>
              <span class="value">${booking.numNights}</span>
            </div>
          </div>
          
          <div class="total">
            <span style="font-size: 14px; color: #718096;">Total Amount</span><br>
            <strong>€${booking.totalPrice.toLocaleString()}</strong>
          </div>
          
          <h3 style="color: #1a365d;">Check-in Information</h3>
          <p><strong>Check-in Time:</strong> ${property.checkInTime}</p>
          <p><strong>Check-out Time:</strong> ${property.checkOutTime}</p>
          <p><strong>Address:</strong> ${property.address}, ${property.city}</p>
          
          <p style="margin-top: 30px;">We will send you detailed arrival instructions closer to your stay. If you have any questions, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
          <p style="margin: 0; color: #718096;">The VIF Luxury Riviera</p>
          <p style="margin: 5px 0; color: #a0aec0; font-size: 12px;">French Riviera, France</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Booking Confirmation - ${property.name}
    
    Dear ${booking.guestName},
    
    Thank you for your reservation! Your booking has been confirmed.
    
    Booking Reference: ${booking.bookingRef}
    Property: ${property.name}
    Check-in: ${new Date(booking.checkIn).toLocaleDateString()}
    Check-out: ${new Date(booking.checkOut).toLocaleDateString()}
    Guests: ${booking.numGuests}
    Total: €${booking.totalPrice.toLocaleString()}
    
    Check-in Time: ${property.checkInTime}
    Check-out Time: ${property.checkOutTime}
    Address: ${property.address}, ${property.city}
    
    The VIF Luxury Riviera
  `;
  
  return sendEmail({ to: booking.guestEmail, subject, html, text });
};

/**
 * Send booking notification to admin
 */
export const sendAdminBookingNotification = async (booking, property) => {
  const subject = `New Booking: ${property.name} - ${booking.bookingRef}`;
  
  const html = `
    <h2>New Booking Received</h2>
    <p><strong>Booking Ref:</strong> ${booking.bookingRef}</p>
    <p><strong>Property:</strong> ${property.name}</p>
    <p><strong>Guest:</strong> ${booking.guestName}</p>
    <p><strong>Email:</strong> ${booking.guestEmail}</p>
    <p><strong>Phone:</strong> ${booking.guestPhone || 'Not provided'}</p>
    <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
    <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
    <p><strong>Guests:</strong> ${booking.numGuests}</p>
    <p><strong>Total:</strong> €${booking.totalPrice.toLocaleString()}</p>
    <p><strong>Status:</strong> ${booking.status}</p>
    ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
  `;
  
  return sendEmail({ to: config.admin.email, subject, html });
};

/**
 * Send inquiry notification
 */
export const sendInquiryNotification = async (inquiry) => {
  const subject = `New Inquiry: ${inquiry.subject || 'General Inquiry'}`;
  
  const html = `
    <h2>New Inquiry Received</h2>
    <p><strong>From:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone || 'Not provided'}</p>
    ${inquiry.propertyId ? `<p><strong>Property Interest:</strong> ${inquiry.propertyId}</p>` : ''}
    ${inquiry.checkIn ? `<p><strong>Dates:</strong> ${new Date(inquiry.checkIn).toLocaleDateString()} - ${new Date(inquiry.checkOut).toLocaleDateString()}</p>` : ''}
    ${inquiry.numGuests ? `<p><strong>Guests:</strong> ${inquiry.numGuests}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${inquiry.message}</p>
  `;
  
  return sendEmail({ to: config.admin.email, subject, html });
};

/**
 * Send inquiry auto-reply
 */
export const sendInquiryAutoReply = async (inquiry) => {
  const subject = 'Thank you for your inquiry - The VIF Luxury Riviera';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>The VIF Luxury Riviera</h1>
        </div>
        <div style="padding: 30px; background: #fff; border: 1px solid #e2e8f0;">
          <p>Dear ${inquiry.name},</p>
          <p>Thank you for reaching out to The VIF Luxury Riviera. We have received your inquiry and will respond within 24 hours.</p>
          <p>In the meantime, feel free to explore our properties and experiences on our website.</p>
          <p>Warm regards,<br>The VIF Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({ to: inquiry.email, subject, html });
};

/**
 * Send check-in reminder
 */
export const sendCheckInReminder = async (booking, property, daysUntil) => {
  const subject = `Your stay at ${property.name} is ${daysUntil} day${daysUntil > 1 ? 's' : ''} away!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>The VIF Luxury Riviera</h1>
          <p>Your Trip is Almost Here!</p>
        </div>
        <div style="padding: 30px; background: #fff; border: 1px solid #e2e8f0;">
          <p>Dear ${booking.guestName},</p>
          <p>We're excited to welcome you to <strong>${property.name}</strong> in just ${daysUntil} day${daysUntil > 1 ? 's' : ''}!</p>
          
          <h3>Arrival Details</h3>
          <p><strong>Check-in Date:</strong> ${new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p><strong>Check-in Time:</strong> From ${property.checkInTime}</p>
          <p><strong>Address:</strong> ${property.address}, ${property.city}</p>
          
          <h3>What to Expect</h3>
          <p>Upon arrival, you'll find detailed instructions for accessing the property. Our team is available if you need any assistance.</p>
          
          <p>We look forward to hosting you!</p>
          <p>Warm regards,<br>The VIF Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({ to: booking.guestEmail, subject, html });
};

export default {
  sendEmail,
  sendBookingConfirmation,
  sendAdminBookingNotification,
  sendInquiryNotification,
  sendInquiryAutoReply,
  sendCheckInReminder,
};

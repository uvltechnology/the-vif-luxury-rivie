import { motion } from 'framer-motion'

export default function TermsOfService() {
  const sectionStyle = {
    marginBottom: '2.5rem'
  }

  const headingStyle = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#0f1c2e',
    marginBottom: '1rem'
  }

  const paragraphStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: 1.8,
    color: '#555',
    marginBottom: '1rem'
  }

  const listStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: 1.8,
    color: '#555',
    marginLeft: '1.5rem',
    marginBottom: '1rem'
  }

  return (
    <div className="bg-[#faf8f5]">
      {/* Header Section */}
      <section className="pt-32 md:pt-40 pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '0.02em',
              color: '#0f1c2e',
              marginBottom: '1.5rem'
            }}
          >
            Terms of Service
          </motion.h1>
          
          {/* Decorative Wave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mx-auto">
              <path d="M0 6C10 6 10 2 20 2C30 2 30 10 40 10C50 10 50 6 60 6" stroke="#c9a962" strokeWidth="1.5" fill="none"/>
            </svg>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#777'
            }}
          >
            Last Updated: February 17, 2026
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div style={sectionStyle}>
              <h2 style={headingStyle}>1. Agreement to Terms</h2>
              <p style={paragraphStyle}>
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Guest," "you," or "your") and The VIF (The Vacation in France) ("Company," "we," "our," or "us") governing your access to and use of our website, services, and luxury villa rental accommodations located on the French Riviera, France.
              </p>
              <p style={paragraphStyle}>
                By accessing our website, submitting a booking inquiry, or making a reservation, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use our services.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>2. Eligibility</h2>
              <p style={paragraphStyle}>
                You must be at least eighteen (18) years of age and have the legal capacity to enter into binding contracts to use our services and make reservations. By using our services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>3. Booking and Reservations</h2>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>3.1 Booking Process</p>
              <p style={paragraphStyle}>
                All booking inquiries submitted through our website are requests for reservation and do not constitute a confirmed booking. A reservation is only confirmed upon our written acceptance and receipt of the required deposit payment.
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>3.2 Deposit and Payment</p>
              <ul style={listStyle}>
                <li>A non-refundable deposit of thirty percent (30%) of the total rental amount is required to confirm your reservation</li>
                <li>The remaining balance (70%) is due thirty (30) days prior to the check-in date</li>
                <li>For reservations made within thirty (30) days of the check-in date, full payment is required at the time of booking</li>
                <li>A refundable security deposit may be required and will be specified in your booking confirmation</li>
              </ul>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>3.3 Pricing</p>
              <p style={paragraphStyle}>
                All prices are quoted in Euros (EUR) and are subject to change without notice until a reservation is confirmed. Prices do not include applicable taxes, tourist taxes, or additional services unless explicitly stated.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>4. Cancellation Policy</h2>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>4.1 Cancellation by Guest</p>
              <ul style={listStyle}>
                <li><strong>More than 60 days before check-in:</strong> Full refund of payments made, minus the non-refundable deposit (30%)</li>
                <li><strong>30-60 days before check-in:</strong> 50% refund of the total rental amount</li>
                <li><strong>Less than 30 days before check-in:</strong> No refund will be provided</li>
              </ul>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>4.2 Cancellation by The VIF</p>
              <p style={paragraphStyle}>
                In the unlikely event that we must cancel your reservation due to circumstances beyond our reasonable control (force majeure, property damage, or other unforeseen events), we will offer you either a full refund of all payments made or alternative accommodation dates, at your option.
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>4.3 Modifications</p>
              <p style={paragraphStyle}>
                Requests to modify reservation dates are subject to availability and may incur additional charges. Any date changes must be agreed upon in writing.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>5. Check-In and Check-Out</h2>
              <ul style={listStyle}>
                <li><strong>Check-in time:</strong> 4:00 PM (16:00) or as otherwise agreed</li>
                <li><strong>Check-out time:</strong> 10:00 AM (10:00) or as otherwise agreed</li>
                <li>Early check-in or late check-out may be available upon request and may incur additional charges</li>
                <li>Guests must present valid photo identification upon check-in</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>6. Guest Responsibilities and House Rules</h2>
              <p style={paragraphStyle}>
                During your stay, you agree to:
              </p>
              <ul style={listStyle}>
                <li>Treat the property, furnishings, and amenities with care and respect</li>
                <li>Not exceed the maximum occupancy stated in your booking confirmation</li>
                <li>Not host parties, events, or gatherings without prior written consent</li>
                <li>Comply with all local laws, regulations, and community guidelines</li>
                <li>Maintain reasonable noise levels, particularly between 10:00 PM and 8:00 AM</li>
                <li>Not smoke inside the villa (designated outdoor smoking areas may be provided)</li>
                <li>Not bring pets unless explicitly approved in writing</li>
                <li>Report any damage, malfunction, or issue to our management team promptly</li>
                <li>Leave the property in a reasonably clean and tidy condition upon departure</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>7. Liability and Damages</h2>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>7.1 Guest Liability</p>
              <p style={paragraphStyle}>
                You are responsible for any damage to the property, furnishings, equipment, or amenities caused by you, your guests, or any persons you allow on the premises during your stay. The cost of repair or replacement will be deducted from your security deposit or charged to you directly.
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>7.2 Limitation of Liability</p>
              <p style={paragraphStyle}>
                To the maximum extent permitted by law, The VIF shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or other intangible losses, arising out of or related to your use of our services.
              </p>
              <p style={paragraphStyle}>
                We are not responsible for any loss, theft, or damage to personal belongings during your stay. We strongly recommend that guests secure appropriate travel insurance to cover personal property, trip cancellation, and medical emergencies.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>8. Insurance</h2>
              <p style={paragraphStyle}>
                We strongly recommend that all guests obtain comprehensive travel insurance that covers trip cancellation, interruption, medical emergencies, personal liability, and loss or damage to personal belongings. The VIF does not provide insurance coverage for guests.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>9. Privacy</h2>
              <p style={paragraphStyle}>
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to our collection and use of information as described in our Privacy Policy.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>10. Intellectual Property</h2>
              <p style={paragraphStyle}>
                All content on our website, including but not limited to text, graphics, logos, images, photographs, and software, is the property of The VIF or its content suppliers and is protected by French and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>11. Force Majeure</h2>
              <p style={paragraphStyle}>
                Neither party shall be liable for any failure or delay in performing their obligations under these Terms if such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, epidemics, pandemics, or strikes.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>12. Dispute Resolution</h2>
              <p style={paragraphStyle}>
                Any dispute arising out of or relating to these Terms or your use of our services shall first be attempted to be resolved through good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within thirty (30) days, it shall be submitted to mediation in accordance with the mediation rules of the International Chamber of Commerce (ICC).
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>13. Governing Law and Jurisdiction</h2>
              <p style={paragraphStyle}>
                These Terms shall be governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions. Any legal action or proceeding arising out of these Terms shall be brought exclusively in the courts of Nice, France, and you hereby consent to the personal jurisdiction of such courts.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>14. Severability</h2>
              <p style={paragraphStyle}>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>15. Entire Agreement</h2>
              <p style={paragraphStyle}>
                These Terms, together with our Privacy Policy and any booking confirmation or rental agreement, constitute the entire agreement between you and The VIF regarding your use of our services and supersede all prior or contemporaneous communications, whether oral or written.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>16. Changes to Terms</h2>
              <p style={paragraphStyle}>
                We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be posted on this page with an updated "Last Updated" date. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>17. Contact Information</h2>
              <p style={paragraphStyle}>
                If you have any questions or concerns about these Terms of Service, please contact us at:
              </p>
              <p style={paragraphStyle}>
                <strong>The VIF</strong><br />
                French Riviera, France<br />
                Email: contact@thevif.com<br />
                Phone: +33 6 21 04 94 43
              </p>
            </div>

            <div style={{ ...sectionStyle, marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f5f0e8', borderLeft: '4px solid #c9a962' }}>
              <p style={{ ...paragraphStyle, marginBottom: 0, fontStyle: 'italic' }}>
                By using The VIF's services and making a reservation, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              <h2 style={headingStyle}>1. Introduction</h2>
              <p style={paragraphStyle}>
                The VIF ("we," "our," or "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, make a booking inquiry, or use our villa rental services on the French Riviera.
              </p>
              <p style={paragraphStyle}>
                By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>2. Information We Collect</h2>
              <p style={paragraphStyle}>
                We collect several types of information from and about users of our services, including:
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>2.1 Personal Information</p>
              <ul style={listStyle}>
                <li>Full name (first and last name)</li>
                <li>Email address</li>
                <li>Telephone number (including country code)</li>
                <li>Travel dates (arrival and departure)</li>
                <li>Number of guests (adults and children)</li>
                <li>Any additional information you provide in your inquiry message</li>
              </ul>
              <p style={{ ...paragraphStyle, fontWeight: 500 }}>2.2 Automatically Collected Information</p>
              <ul style={listStyle}>
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>3. How We Use Your Information</h2>
              <p style={paragraphStyle}>
                We use the information we collect about you for the following purposes:
              </p>
              <ul style={listStyle}>
                <li>To process and respond to your booking inquiries and requests</li>
                <li>To communicate with you regarding your reservation and stay</li>
                <li>To provide you with information about our villa and services</li>
                <li>To personalize and improve your experience with our services</li>
                <li>To send you promotional communications (with your consent)</li>
                <li>To comply with legal obligations and protect our rights</li>
                <li>To analyze website usage and improve our services</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>4. Legal Basis for Processing (GDPR)</h2>
              <p style={paragraphStyle}>
                For users in the European Economic Area (EEA), we process your personal data based on the following legal grounds:
              </p>
              <ul style={listStyle}>
                <li><strong>Contract Performance:</strong> Processing necessary to fulfill your booking request and provide our services</li>
                <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, such as improving our services and preventing fraud</li>
                <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities, such as marketing communications</li>
                <li><strong>Legal Obligation:</strong> Processing necessary to comply with applicable laws and regulations</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>5. Information Sharing and Disclosure</h2>
              <p style={paragraphStyle}>
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul style={listStyle}>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business (e.g., email service providers)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our guests and others</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>6. Data Retention</h2>
              <p style={paragraphStyle}>
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. The retention period may vary depending on the context of the processing and our legal obligations.
              </p>
              <p style={paragraphStyle}>
                Booking inquiry data is typically retained for a period of three (3) years from the date of your last interaction with us, unless a longer retention period is required by law or for legitimate business purposes.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>7. Your Rights</h2>
              <p style={paragraphStyle}>
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul style={listStyle}>
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p style={paragraphStyle}>
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>8. Cookies and Tracking Technologies</h2>
              <p style={paragraphStyle}>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, some parts of this website may become inaccessible or not function properly.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>9. International Data Transfers</h2>
              <p style={paragraphStyle}>
                Your personal information may be transferred to, stored, and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your personal information in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>10. Security Measures</h2>
              <p style={paragraphStyle}>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>11. Children's Privacy</h2>
              <p style={paragraphStyle}>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>12. Changes to This Privacy Policy</h2>
              <p style={paragraphStyle}>
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>13. Contact Us</h2>
              <p style={paragraphStyle}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p style={paragraphStyle}>
                <strong>The VIF</strong><br />
                French Riviera, France<br />
                Email: contact@thevif.com<br />
                Phone: +33 6 21 04 94 43
              </p>
              <p style={paragraphStyle}>
                For users in the European Union, you also have the right to lodge a complaint with your local data protection supervisory authority.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

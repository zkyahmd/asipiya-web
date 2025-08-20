const db = require('../models/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Submit contact form
const submitContactForm = async (req, res) => {
  console.log('📧 Contact form submission received:', req.body);
  
  try {
    const { name, email, message, interest } = req.body;

    // Validation
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    const connection = await db;

    // Insert into database
    const insertQuery = `
      INSERT INTO contact_submissions (Name, Email, Message, Interest) 
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(insertQuery, [name, email, message, interest || null]);
    console.log('✅ Data saved to database with ID:', result.insertId);

    // Send email notification to admin
    try {
      const adminMailOptions = {
        from: process.env.EMAIL_USER ,
        to: process.env.TO,
        subject: '🔔 New Contact Form Submission - Asipiya Soft Solutions',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a855f7 100%); padding: 50px 30px; text-align: center;">
                <div style="margin-bottom: 20px;">
                  <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: white; letter-spacing: 1px;">ASIPIYA SOFT SOLUTIONS</h1>
                  <div style="width: 100px; height: 3px; background-color: rgba(255, 255, 255, 0.8); margin: 15px auto; border-radius: 2px;"></div>
                </div>
                <h2 style="margin: 20px 0 0 0; font-size: 24px; font-weight: 600; color: white;">New Contact Form Submission</h2>
                <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">You have received a new inquiry</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Contact Details -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                  <h2 style="color: #7c3aed; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">📋 Contact Details</h2>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 16px;">
                        <strong style="color: #374151;">Name:</strong>
                        <span style="color: #6b7280; margin-left: 10px;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 16px;">
                        <strong style="color: #374151;">Email:</strong>
                        <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; margin-left: 10px;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-size: 16px;">
                        <strong style="color: #374151;">Interest:</strong>
                        ${interest ? `<span style="background-color: #7c3aed; color: white; padding: 4px 12px; border-radius: 16px; font-size: 14px; margin-left: 10px;">${interest}</span>` : `<span style="color: #9ca3af; margin-left: 10px; font-style: italic;">Not specified</span>`}
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Message -->
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                  <h2 style="color: #7c3aed; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">💬 Message</h2>
                  <div style="color: #374151; font-size: 16px; line-height: 1.6;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
                
                <!-- Quick Actions -->
                <div style="text-align: center; margin-bottom: 24px;">
                  <a href="mailto:${email}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">📧 Reply to ${name}</a>
                  <a href="tel:+94741870003" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">📞 Call Customer</a>
                </div>
                
                <!-- Submission Info -->
                <div style="background-color: #f1f5f9; border-radius: 6px; padding: 16px; text-align: center;">
                  <p style="margin: 0; font-size: 14px; color: #64748b;">
                    <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZone: 'Asia/Colombo'
                    })} (Sri Lanka Time)
                  </p>
                  <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8;">
                    Form ID: #${result.insertId} | Source: Asipiya Website
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #1e293b; padding: 24px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 18px; font-weight: 600;">Asipiya Soft Solutions</p>
                <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                  📍 NO.716, Kohalwila Road, Dalugama, Kelaniya<br>
                  📞 +94 74 187 0003 | 📧 info@asipiya.lk
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send the admin email
      await transporter.sendMail(adminMailOptions);
      console.log('✅ Admin email sent successfully');

      // Send confirmation email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '✅ Thank you for contacting Asipiya Soft Solutions!',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You - Asipiya Soft Solutions</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a855f7 100%); padding: 50px 30px; text-align: center;">
                <div style="margin-bottom: 20px;">
                  <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: white; letter-spacing: 1px;">ASIPIYA SOFT SOLUTIONS</h1>
                  <div style="width: 100px; height: 3px; background-color: rgba(255, 255, 255, 0.8); margin: 15px auto; border-radius: 2px;"></div>
                </div>
                <h2 style="margin: 20px 0 0 0; font-size: 24px; font-weight: 600; color: white;">Thank You for Contacting Us!</h2>
                <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">We've received your message successfully</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                
                <!-- Greeting -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <h2 style="color: #374151; font-size: 22px; margin: 0 0 16px 0;">Dear ${name},</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #6b7280; margin: 0;">
                    Thank you for reaching out to Asipiya Soft Solutions! We appreciate your interest in our services.
                  </p>
                </div>
                
                <!-- Submission Details -->
                <div style="background-color: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: #7c3aed; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">📋 Your Submission Details</h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #d8b4fe; font-size: 16px;">
                        <strong style="color: #374151;">Name:</strong>
                        <span style="color: #6b7280; margin-left: 10px;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #d8b4fe; font-size: 16px;">
                        <strong style="color: #374151;">Email:</strong>
                        <span style="color: #6b7280; margin-left: 10px;">${email}</span>
                      </td>
                    </tr>
                    ${interest ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #d8b4fe; font-size: 16px;">
                          <strong style="color: #374151;">Interest:</strong>
                          <span style="background-color: #7c3aed; color: white; padding: 4px 12px; border-radius: 16px; font-size: 14px; margin-left: 10px;">${interest}</span>
                        </td>
                      </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 12px 0; font-size: 16px;">
                        <strong style="color: #374151;">Submitted:</strong>
                        <span style="color: #6b7280; margin-left: 10px;">${new Date().toLocaleString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit',
                          timeZone: 'Asia/Colombo'
                        })}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- What's Next -->
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: #7c3aed; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">⏰ What Happens Next?</h3>
                  
                  <div style="space-y: 12px;">
                    <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                      <strong style="color: #7c3aed;">1.</strong> Our team will review your message within <strong>24-48 hours</strong>
                    </p>
                    <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                      <strong style="color: #7c3aed;">2.</strong> We'll respond to your inquiry via <strong>email or phone</strong>
                    </p>
                    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #374151;">
                      <strong style="color: #7c3aed;">3.</strong> If needed, we may schedule a <strong>consultation call</strong>
                    </p>
                  </div>
                </div>
                
                <!-- CTA Buttons -->
                <div style="text-align: center; margin-bottom: 24px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; color: #6b7280;">
                    While you wait, feel free to explore our services and learn more about what we do.
                  </p>
                  <a href="https://asipiya.lk" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin-right: 10px;">🌐 Visit Website</a>
                  <a href="https://asipiya.lk/services" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">💼 Our Services</a>
                </div>
                
                <!-- Contact Info -->
                <div style="background-color: #f1f5f9; border-radius: 6px; padding: 20px; text-align: center;">
                  <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-weight: 600;">Need Immediate Assistance?</p>
                  <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                    📞 +94 74 187 0003 | 📧 info@asipiya.lk | 💬 WhatsApp: +94 74 187 0003
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #1e293b; padding: 24px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 18px; font-weight: 600;">Asipiya Soft Solutions</p>
                <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                  📍 NO.716, Kohalwila Road, Dalugama, Kelaniya<br>
                  🌐 www.asipiya.lk | 📧 info@asipiya.lk
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Send confirmation email to user
      await transporter.sendMail(userMailOptions);
      console.log('✅ User confirmation email sent successfully to:', email);
      
    } catch (emailError) {
      console.log('⚠️ Email sending failed:', emailError.message);
      
      // Create a manual email notification as fallback
      console.log('📧 MANUAL EMAIL NOTIFICATION REQUIRED:');
      console.log('=====================================');
      console.log(`Admin Email To: ${process.env.TO}`);
      console.log(`User Confirmation Email To: ${email}`);
      console.log(`Subject: New Contact Form Submission - Asipiya Website`);
      console.log(`From: ${name} (${email})`);
      console.log(`Interest: ${interest || 'Not specified'}`);
      console.log(`Message: ${message}`);
      console.log(`Submitted: ${new Date().toLocaleString()}`);
      console.log('=====================================');
      
      // Continue execution even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: {
        contactId: result.insertId,
        name,
        email,
        submittedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the contact form'
    });
  }
};

// Get all contact submissions (for admin panel)
const getAllContactSubmissions = async (req, res) => {
  try {
    const connection = await db;
    const [rows] = await connection.execute(
      'SELECT * FROM contact_submissions ORDER BY SubmittedAt DESC'
    );

    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length
    });

  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching contact submissions'
    });
  }
};

// Get contact submission by ID
const getContactSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db;
    
    const [rows] = await connection.execute(
      'SELECT * FROM contact_submissions WHERE ContactId = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error fetching contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the contact submission'
    });
  }
};

// Delete contact submission
const deleteContactSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db;
    
    const [result] = await connection.execute(
      'DELETE FROM contact_submissions WHERE ContactId = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the contact submission'
    });
  }
};

// Update contact submission status (for marking as read/handled)
const updateContactSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const connection = await db;
    
    const [result] = await connection.execute(
      'UPDATE contact_submissions SET Status = ? WHERE ContactId = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact submission status updated successfully'
    });

  } catch (error) {
    console.error('Error updating contact submission status:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the contact submission status'
    });
  }
};

module.exports = {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  updateContactSubmissionStatus
};

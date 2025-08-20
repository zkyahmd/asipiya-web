const dbPromise = require('../models/db');

const submitApplication = async (req, res) => {
  const {
    fullName,
    emailAddress,
    contactNumber,
    positionApplied,
    linkedinProfile,
    nicNumber,
  } = req.body;

  const cvFile = req.file ? req.file.filename : null;

  try {
    const connection = await dbPromise; // Get the connection from the promise

    const sql = `
      INSERT INTO job_applications 
      (full_name, email, contact_number, position_applied, linkedin_profile, nic_number, cv_filename)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await connection.query(sql, [
      fullName,
      emailAddress,
      contactNumber,
      positionApplied,
      linkedinProfile,
      nicNumber,
      cvFile
    ]);

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error('Application Submission Error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

module.exports = {
  submitApplication,
};
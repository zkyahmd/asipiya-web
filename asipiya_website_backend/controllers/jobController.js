const db = require('../models/db'); // This is a promise from mysql2/promise

// Get all jobs
const getAllJobs = async (_, res) => {
  try {
    const connection = await db;
    const [results] = await connection.query("SELECT * FROM jobs ORDER BY date_posted DESC");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a job
const createJob = async (req, res) => {
  const {
    title,
    type,
    location,
    description,
    requirements,
    responsibilities,
    benefits,
    application_deadline,
  } = req.body;

  const sql = `
    INSERT INTO jobs 
    (title, type, location, description, requirements, responsibilities, benefits, application_deadline) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const connection = await db;
    const [result] = await connection.query(sql, [
      title,
      type,
      location,
      description,
      requirements,
      responsibilities,
      benefits,
      application_deadline,
    ]);
    res.json({ message: "Job created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    location,
    description,
    requirements,
    responsibilities,
    benefits,
    application_deadline,
  } = req.body;

  const sql = `
    UPDATE jobs 
    SET title=?, type=?, location=?, description=?, requirements=?, responsibilities=?, benefits=?, application_deadline=? 
    WHERE id=?
  `;

  try {
    const connection = await db;
    await connection.query(sql, [
      title,
      type,
      location,
      description,
      requirements,
      responsibilities,
      benefits,
      application_deadline,
      id,
    ]);
    res.json({ message: "Job updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await db;
    await connection.query("DELETE FROM jobs WHERE id=?", [id]);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await db;
    const [results] = await connection.query("SELECT * FROM jobs WHERE id = ?", [id]);
    if (results.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle job applications
const submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      contactNumber,
      positionApplied,
      linkedinProfile,
      nicNumber
    } = req.body;

    const cvPath = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO job_applications 
      (full_name, email, contact_number, position_applied, linkedin_profile, nic_number, cv_filename) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const connection = await db;
    const [result] = await connection.query(sql, [
      fullName,
      email,
      contactNumber,
      positionApplied,
      linkedinProfile || null,
      nicNumber || null,
      cvPath
    ]);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: result.insertId
    });

  } catch (err) {
    console.error("Application error:", err);
    res.status(500).json({
      success: false,
      error: "Application failed",
      details: err.message
    });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const connection = await db;
    const [results] = await connection.query(`
      SELECT * FROM job_applications 
      ORDER BY created_at DESC
    `);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await db;
    
    // First get the CV filename if exists
    const [app] = await connection.query(
      'SELECT cv_filename FROM job_applications WHERE id = ?',
      [id]
    );
    
    // Delete from database
    await connection.query(
      'DELETE FROM job_applications WHERE id = ?',
      [id]
    );
    
    // Delete the file if exists
    if (app[0]?.cv_filename) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../uploads', app[0].cv_filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  submitApplication,
  getAllApplications,
  deleteApplication
};
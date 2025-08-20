const dbPromise = require('../models/db');
const bcrypt = require('bcrypt');

// Sign Up Controller
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Get the connection from the promise
    const connection = await dbPromise;
    
    // Check for existing email
    const [existingAdmin] = await connection.query('SELECT * FROM admin WHERE Email = ?', [email]);

    if (existingAdmin.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      'INSERT INTO admin (Name, Email, Password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Sign In Controller
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request with email:', email);
  console.log('Received password:', password);

  try {
    // Get the connection from the promise
    const connection = await dbPromise;
    
    const [results] = await connection.query('SELECT * FROM admin WHERE Email = ?', [email]);

    console.log('DB results:', results);

    if (results.length === 0) {
      console.log('No admin found with this email');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = results[0];
    console.log('Stored password hash:', admin.Password);

    const isMatch = await bcrypt.compare(password, admin.Password);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful');
    res.status(200).json({ Status: 'Success' });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

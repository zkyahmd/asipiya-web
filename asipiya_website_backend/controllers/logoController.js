const dbPromise = require('../models/db');
const fs = require('fs');
const path = require('path');

exports.createLogo = async (req, res) => {
  try {
    const connection = await dbPromise;
    const { CompanyName } = req.body;
    const logoFile = req.file;

    // Remove extra semicolon
    const logoPath = `/assets/ClientLogo/${logoFile.filename}`;

    await connection.query(
      'INSERT INTO client_logo (CompanyName, LogoPath) VALUES (?, ?)',
      [CompanyName, logoPath]
    );

    res.status(201).json({ message: 'Logo uploaded successfully' });
  } catch (err) {
    console.error('Error uploading logo:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const connection = await dbPromise;
    const [rows] = await connection.query('SELECT * FROM client_logo');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching logos:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLogo = async (req, res) => {
  try {
    const connection = await dbPromise;
    const id = req.params.id;

    // Get logo details
    const [logos] = await connection.query('SELECT * FROM client_logo WHERE LogoId = ?', [id]);
    
    if (logos.length === 0) {
      return res.status(404).json({ message: 'Logo not found' });
    }
    
    const logo = logos[0];
    
    // Extract filename from path
    const filename = logo.LogoPath.split('/').pop();
    
    // Define the actual file path on the filesystem
    const filePath = path.join('C:/xampp/htdocs/New folder/New_Asipiya_Website/asipiya_website_frontend/src/assets/ClientLogo', filename);
    
    // Delete file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await connection.query('DELETE FROM client_logo WHERE LogoId = ?', [id]);
    
    res.json({ message: 'Logo deleted successfully' });
  } catch (err) {
    console.error('Error deleting logo:', err);
    res.status(500).json({ message: err.message });
  }
};

// Add update functionality
exports.updateLogo = async (req, res) => {
  try {
    const connection = await dbPromise;
    const id = req.params.id;
    const { CompanyName } = req.body;
    
    // If there's a new file
    if (req.file) {
      // Get the old logo details
      const [logos] = await connection.query('SELECT * FROM client_logo WHERE LogoId = ?', [id]);
      
      if (logos.length === 0) {
        return res.status(404).json({ message: 'Logo not found' });
      }
      
      const oldLogo = logos[0];
      
      // Extract filename from path
      const oldFilename = oldLogo.LogoPath.split('/').pop();
      
      // Define the actual file path on the filesystem
      const oldFilePath = path.join('../asipiya_website_frontend/src/assets/ClientLogo', oldFilename);
      
      // Delete old file if it exists
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      
      // Set new logo path
      const logoPath = `/assets/ClientLogo/${req.file.filename}`;
      
      // Update database with new file
      await connection.query(
        'UPDATE client_logo SET CompanyName = ?, LogoPath = ? WHERE LogoId = ?',
        [CompanyName, logoPath, id]
      );
    } else {
      // Update only the company name
      await connection.query(
        'UPDATE client_logo SET CompanyName = ? WHERE LogoId = ?',
        [CompanyName, id]
      );
    }
    
    res.json({ message: 'Logo updated successfully' });
  } catch (err) {
    console.error('Error updating logo:', err);
    res.status(500).json({ message: err.message });
  }
};

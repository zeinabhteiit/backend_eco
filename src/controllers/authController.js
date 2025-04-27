import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';


import nodemailer from 'nodemailer';



const secret = process.env.JWT_SECRET;

export const register = (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Hashing failed' });

    const sql = 'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hash, role], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      res.status(201).json({ message: 'User registered', userId: result.insertId });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '2h' });

      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    });
  });
};

export const getMe = (req, res) => {
  const userId = req.user.id;

  const sql = 'SELECT id, name, email, role FROM Users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(results[0]);
  });
};






// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  // Validate email input
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'norma.hoppe@ethereal.email', // Replace with your Ethereal credentials
        pass: 'twFQCCE8HCgBrgxHEQ' // Replace with your Ethereal password
      }
    });

    const info = await transporter.sendMail({
      from: '"Your App" <your_email@example.com>',
      to: email,
      subject: 'Password Reset Request',
      text: 'Please click the link below to reset your password.',
      html: `<p>Please click <a href="http://localhost:3000/reset-password?email=${email}">here</a> to reset your password.</p>`
    });

    console.log('Email sent:', info);
    res.status(200).json({ message: 'Password reset link sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
};

// Reset Password
export const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.id;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Hashing failed' });

      const sql = 'UPDATE Users SET password = ? WHERE id = ?';
      db.query(sql, [hash, userId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.json({ message: 'Password has been reset' });
      });
    });
  });
};
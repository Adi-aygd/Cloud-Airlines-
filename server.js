// Import required packages
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();

// Setup middleware
app.use(cors());                    // Allow cross-origin requests
app.use(express.json());           // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Route to get all flights
app.get('/api/flights', (req, res) => {
    db.query('SELECT * FROM flight', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
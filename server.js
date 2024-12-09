// /backend/server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize dotenv to load environment variables
//dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;  // Default to 5000 if no PORT is set in .env

// Middleware setup
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data

// API routes
app.use('/api/auth', authRoutes); 
app.use('/api/events', eventRoutes); 
app.use('/api/reports', reportRoutes); 
app.use('/api/dashboard', dashboardRoutes); 

// Serve static files in production (React build folder)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));  // Serve React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

// MongoDB connection setup
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/event-management';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

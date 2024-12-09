// /backend/routes/eventRoutes.js
const express = require('express');
const multer = require('multer');
const Event = require('../models/Event');
const path = require('path');
const sendEmail = require('../utils/emailHelper');  // Importing sendEmail function
const { sendSMS } = require('../utils/twilioHelper');   // Importing sendSMS function
const authMiddleware = require('../middleware/authMiddleware');  // Import the authentication middleware

const router = express.Router();

// Set up file storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for storing uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename for uploaded image
    },
});
const upload = multer({ storage });

// Event creation route
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, location, date, description, ticketCategories, email, phone } = req.body;

        // Create new event in the database
        const event = new Event({
            name,
            location,
            date,
            description,
            image: req.file ? `/uploads/${req.file.filename}` : null, // Save the image URL
            ticketCategories: JSON.parse(ticketCategories), // Parse ticket categories to object
        });

        await event.save();

        // Send promotional email
        const emailSubject = `Event Created: ${name}`;
        const emailText = `Check out our upcoming event: \n\n${name} at ${location} on ${new Date(date).toLocaleString()}.`;
        await sendEmail(email, emailSubject, emailText);  // Send email to user

        // Send SMS notification to user
        const smsText = `New event: ${name} at ${location} on ${new Date(date).toLocaleString()}.`;
        await sendSMS(phone, smsText);  // Send SMS to user

        res.status(201).json({ message: 'Event created, email and SMS sent successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create event', error: err.message });
    }
});

module.exports = router;

// /backend/routes/reportRoutes.js
const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;  // Library to convert JSON to CSV
const authMiddleware = require('../middleware/authMiddleware');  // Import the authentication middleware

// Route to get report data (sales and demographics)
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Fetch all events
        const events = await Event.find();

        const reportData = events.map((event) => {
            const totalSales = event.ticketCategories.reduce((acc, category) => acc + category.price * category.soldTickets, 0);
            const totalAttendees = event.attendees.length;

            return {
                eventId: event._id,
                name: event.name,
                totalSales,
                totalAttendees
            };
        });

        res.status(200).json(reportData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch report data', error: err.message });
    }
});

// Route to download attendee list for a specific event
router.get('/attendees/:eventId', authMiddleware, async (req, res) => {
    const { eventId } = req.params;

    try {
        // Find event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Prepare attendee data
        const attendeeData = event.attendees.map((attendee) => ({
            name: attendee.name,
            email: attendee.email,
            phone: attendee.phone,
        }));

        // Convert attendee data to CSV
        const csvData = json2csv(attendeeData);
        
        // Set response headers for downloading CSV file
        res.header('Content-Type', 'text/csv');
        res.attachment('attendees.csv');
        res.send(csvData);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch attendee list', error: err.message });
    }
});

module.exports = router;

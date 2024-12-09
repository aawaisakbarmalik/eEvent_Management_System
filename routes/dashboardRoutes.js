// /backend/routes/dashboardRoutes.js
const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');  // Import the authentication middleware

// Route to get all events categorized by status (upcoming, happening, closed)
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        // Fetch all events from the database
        const events = await Event.find();

        // Map events to gather necessary statistics
        const eventStats = events.map(event => {
            const totalTicketsSold = event.ticketCategories.reduce((acc, category) => acc + category.soldTickets, 0);
            const totalAttendees = event.attendees.length;

            return {
                eventId: event._id,
                name: event.name,
                eventStatus: event.eventStatus,
                totalTicketsSold,
                totalAttendees
            };
        });

        // Send event stats as response
        res.status(200).json(eventStats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch event stats', error: err.message });
    }
});

module.exports = router;

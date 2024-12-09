// /backend/controllers/dashboardController.js
const Event = require('../models/Event');

const getDashboardData = async (req, res) => {
    try {
        // Fetch all events
        const events = await Event.find();

        // Calculate attendance and ticket sales
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

        res.status(200).json(eventStats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
    }
};

module.exports = { getDashboardData };

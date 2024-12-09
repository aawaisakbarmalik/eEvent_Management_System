// /backend/controllers/reportController.js
const Event = require('../models/Event');

const getEventReports = async (req, res) => {
    try {
        // Fetch all events
        const events = await Event.find();

        // Generate reports for each event
        const reports = events.map(event => {
            const totalRevenue = event.ticketCategories.reduce((acc, category) => acc + (category.price * category.soldTickets), 0);
            const ticketsSold = event.ticketCategories.reduce((acc, category) => acc + category.soldTickets, 0);
            const totalAttendees = event.attendees.length;

            return {
                name: event.name,
                revenue: totalRevenue,
                ticketsSold,
                attendees: totalAttendees
            };
        });

        res.status(200).json(reports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
    }
};

module.exports = { getEventReports };

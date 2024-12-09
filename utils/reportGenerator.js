const fs = require('fs');
const path = require('path');
const Event = require('../models/Event');

const generateReport = async (eventId) => {
    try {
        const event = await Event.findById(eventId).populate('attendees.user');
        if (!event) {
            throw new Error('Event not found');
        }

        // Prepare report data
        const reportData = {
            eventName: event.name,
            location: event.location,
            date: event.date,
            ticketCategories: event.ticketCategories,
            attendees: event.attendees.map(attendee => ({
                user: attendee.user.name,
                email: attendee.user.email,
                ticketCategory: attendee.ticketCategory,
            })),
            totalRevenue: event.ticketCategories.reduce((acc, category) => acc + (category.soldTickets * category.price), 0),
        };

        // Save report to file (e.g., as a JSON file or CSV)
        const filePath = path.join(__dirname, '../reports', `${eventId}_report.json`);
        fs.writeFileSync(filePath, JSON.stringify(reportData, null, 2));

        return filePath;  // Return file path for download
    } catch (err) {
        throw new Error('Error generating report: ' + err.message);
    }
};

module.exports = { generateReport };

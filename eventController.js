// /backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { name, location, date, images, ticketCategories } = req.body;
    try {
        const event = new Event({
            name,
            location,
            date,
            images,
            ticketCategories,
            createdBy: req.user.id  // Assuming `req.user` contains the authenticated user
        });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

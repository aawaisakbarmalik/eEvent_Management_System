// /backend/models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: Date,
    description: String,
    image: String,
    ticketCategories: [{
        name: String,
        price: Number,
        availableTickets: Number,
        soldTickets: Number
    }],
    eventStatus: {
        type: String,
        enum: ['upcoming', 'happening', 'closed'],
        default: 'upcoming',
    },
    attendees: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        ticketCategory: String,
    }],
});

module.exports = mongoose.model('Event', EventSchema);

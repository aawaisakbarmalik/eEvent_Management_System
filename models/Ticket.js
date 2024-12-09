// /backend/models/Ticket.js
const mongoose = require('mongoose');

// Define the ticket schema
const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // e.g. 'General Admission', 'VIP'
    },
    price: {
        type: Number,
        required: true, // e.g. 50, 100 (the price of the ticket)
    },
    availableTickets: {
        type: Number,
        required: true, // Total number of tickets available for this category
    },
    soldTickets: {
        type: Number,
        default: 0, // Number of tickets sold, starts at 0
    }
}, { timestamps: true });

// Create the Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

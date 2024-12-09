// /frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';  // Importing dashboard.css for styling

function DashboardPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEventStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events/dashboard');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching event stats:', error);
            }
        };

        fetchEventStats();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="event-category">
                <h2 className="category-title">Upcoming Events</h2>
                {events.filter(event => event.eventStatus === 'upcoming').map(event => (
                    <div key={event.eventId} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Status: {event.eventStatus}</p>
                        <p>Tickets Sold: {event.totalTicketsSold}</p>
                        <p>Attendees: {event.totalAttendees}</p>
                    </div>
                ))}
            </div>

            <div className="event-category">
                <h2 className="category-title">Happening Now</h2>
                {events.filter(event => event.eventStatus === 'happening').map(event => (
                    <div key={event.eventId} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Status: {event.eventStatus}</p>
                        <p>Tickets Sold: {event.totalTicketsSold}</p>
                        <p>Attendees: {event.totalAttendees}</p>
                    </div>
                ))}
            </div>

            <div className="event-category">
                <h2 className="category-title">Closed Events</h2>
                {events.filter(event => event.eventStatus === 'closed').map(event => (
                    <div key={event.eventId} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Status: {event.eventStatus}</p>
                        <p>Tickets Sold: {event.totalTicketsSold}</p>
                        <p>Attendees: {event.totalAttendees}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events'); // Ensure this endpoint exists
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const categorizeEvents = (event) => {
        const currentDate = new Date();
        const eventDate = new Date(event.date);
        
        if (eventDate < currentDate) {
            return 'Closed';
        } else if (eventDate > currentDate) {
            return 'Upcoming';
        } else {
            return 'Happening Now';
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h2>Upcoming Events</h2>
                <ul>
                    {events
                        .filter((event) => categorizeEvents(event) === 'Upcoming')
                        .map((event) => (
                            <li key={event._id}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                                <p>{new Date(event.date).toLocaleString()}</p>
                            </li>
                        ))}
                </ul>
            </div>

            <div>
                <h2>Happening Now</h2>
                <ul>
                    {events
                        .filter((event) => categorizeEvents(event) === 'Happening Now')
                        .map((event) => (
                            <li key={event._id}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                                <p>{new Date(event.date).toLocaleString()}</p>
                            </li>
                        ))}
                </ul>
            </div>

            <div>
                <h2>Closed Events</h2>
                <ul>
                    {events
                        .filter((event) => categorizeEvents(event) === 'Closed')
                        .map((event) => (
                            <li key={event._id}>
                                <h3>{event.name}</h3>
                                <p>{event.location}</p>
                                <p>{new Date(event.date).toLocaleString()}</p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;

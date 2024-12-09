import React, { useState } from 'react';
import axios from 'axios';

const EventPromotion = ({ event }) => {
    const [isPromoted, setIsPromoted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePromoteEvent = async () => {
        setLoading(true);
        try {
            // Send promotion email and SMS
            const response = await axios.post('/api/events/promote', {
                eventId: event._id,
                email: event.email,  // Assuming you have email in event data
                phone: event.phone,  // Assuming phone is also present
                name: event.name,
                location: event.location,
                date: event.date,
            });
            setIsPromoted(true);
            alert("Event promoted successfully!");
        } catch (error) {
            console.error("Error promoting event:", error);
            alert("Error promoting event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Promote Event: {event.name}</h3>
            <p>{event.location} - {new Date(event.date).toLocaleString()}</p>
            {!isPromoted ? (
                <button onClick={handlePromoteEvent} disabled={loading}>
                    {loading ? "Promoting..." : "Promote Event"}
                </button>
            ) : (
                <p>Event promoted successfully!</p>
            )}
        </div>
    );
};

export default EventPromotion;

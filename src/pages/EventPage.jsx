// /frontend/src/pages/EventPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/event.css';  // Importing event.css for styling

const EventPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [ticketCategories, setTicketCategories] = useState([{ name: '', price: '' }]);
    const [eventImage, setEventImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEventImage(file);
        }
    };

    const handleTicketCategoryChange = (index, field, value) => {
        const newCategories = [...ticketCategories];
        newCategories[index][field] = value;
        setTicketCategories(newCategories);
    };

    const addTicketCategory = () => {
        setTicketCategories([...ticketCategories, { name: '', price: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object for uploading the event image
        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('location', eventLocation);
        formData.append('date', eventDate);
        formData.append('description', eventDescription);
        formData.append('image', eventImage);
        formData.append('ticketCategories', JSON.stringify(ticketCategories));

        try {
            const response = await axios.post('/api/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Event created successfully!');
            setError('');
            // Optionally redirect to the dashboard or event list
        } catch (err) {
            setError('Failed to create event');
            setSuccess('');
        }
    };

    return (
        <div className="event-container">
            <h1 className="event-title">Create Event</h1>
            <form className="event-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Name:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="datetime-local"
                        className="form-input"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-textarea"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Event Image:</label>
                    <input type="file" className="form-input" onChange={handleImageChange} />
                </div>

                <h3>Ticket Categories</h3>
                {ticketCategories.map((ticket, index) => (
                    <div key={index} className="ticket-category">
                        <div className="form-group">
                            <label>Category Name:</label>
                            <input
                                type="text"
                                className="form-input"
                                value={ticket.name}
                                onChange={(e) => handleTicketCategoryChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-input"
                                value={ticket.price}
                                onChange={(e) => handleTicketCategoryChange(index, 'price', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <button type="button" className="add-category-button" onClick={addTicketCategory}>
                    Add Ticket Category
                </button>
                <div className="form-group">
                    <button type="submit" className="submit-button">Create Event</button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default EventPage;

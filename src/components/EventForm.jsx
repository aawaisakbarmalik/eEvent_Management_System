import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [images, setImages] = useState([]);
    const [ticketCategories, setTicketCategories] = useState([{ name: '', price: '', availableSeats: '' }]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);  // Save files for uploading
    };

    const handleTicketChange = (index, e) => {
        const newCategories = [...ticketCategories];
        newCategories[index][e.target.name] = e.target.value;
        setTicketCategories(newCategories);
    };

    const addTicketCategory = () => {
        setTicketCategories([...ticketCategories, { name: '', price: '', availableSeats: '' }]);
    };

    const removeTicketCategory = (index) => {
        const newCategories = ticketCategories.filter((_, i) => i !== index);
        setTicketCategories(newCategories);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('date', date);
        images.forEach((image, index) => {
            formData.append('images', image);  // Append each image
        });
        ticketCategories.forEach((category, index) => {
            formData.append(`ticketCategories[${index}][name]`, category.name);
            formData.append(`ticketCategories[${index}][price]`, category.price);
            formData.append(`ticketCategories[${index}][availableSeats]`, category.availableSeats);
        });

        try {
            const response = await axios.post('/api/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Event created successfully!');
            console.log(response.data.event);
        } catch (error) {
            alert('Error creating event');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input type="file" multiple onChange={handleImageUpload} />
                <div>
                    <h3>Ticket Categories</h3>
                    {ticketCategories.map((category, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Category Name"
                                name="name"
                                value={category.name}
                                onChange={(e) => handleTicketChange(index, e)}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={category.price}
                                onChange={(e) => handleTicketChange(index, e)}
                            />
                            <input
                                type="number"
                                placeholder="Available Seats"
                                name="availableSeats"
                                value={category.availableSeats}
                                onChange={(e) => handleTicketChange(index, e)}
                            />
                            <button type="button" onClick={() => removeTicketCategory(index)}>Remove Category</button>
                        </div>
                    ))}
                    <button type="button" onClick={addTicketCategory}>Add Category</button>
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;

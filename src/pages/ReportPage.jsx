import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportPage = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/reports');  // Assuming you will implement this route
                setReportData(response.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const handleDownloadAttendeeList = (eventId) => {
        axios
            .get(`/api/reports/attendees/${eventId}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `attendees_${eventId}.csv`);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.error('Error downloading attendee list:', error);
            });
    };

    return (
        <div>
            <h1>Event Reports</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h3>Event Sales Data</h3>
                    {reportData.map((event) => (
                        <div key={event.eventId}>
                            <h4>{event.name}</h4>
                            <p>Total Sales: ${event.totalSales}</p>
                            <p>Total Attendees: {event.totalAttendees}</p>
                            <button onClick={() => handleDownloadAttendeeList(event.eventId)}>
                                Download Attendee List
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportPage;

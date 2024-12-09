import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportViewer = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/api/reports');
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) return <p>Loading reports...</p>;

    return (
        <div>
            <h1>Event Reports</h1>
            {reports.length > 0 ? (
                reports.map((report, index) => (
                    <div key={index}>
                        <h3>{report.name}</h3>
                        <p>Revenue: ${report.revenue}</p>
                        <p>Tickets Sold: {report.ticketsSold}</p>
                        <p>Attendees: {report.attendees}</p>
                    </div>
                ))
            ) : (
                <p>No reports available</p>
            )}
        </div>
    );
};

export default ReportViewer;

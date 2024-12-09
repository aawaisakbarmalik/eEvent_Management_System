// /frontend/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';  // Importing auth.css for styling

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            await axios.post('/api/auth/send-otp', { phone });
            setStep(2); // Go to the next step to enter OTP
            alert('OTP sent successfully!');
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('/api/auth/verify-otp', { phone, code: otp });
            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
            alert('User verified successfully!');
            navigate('/dashboard');  // Redirect to the dashboard after successful login
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to verify OTP');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Login</h1>
            {step === 1 ? (
                <div className="auth-form">
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button className="auth-button" onClick={sendOtp}>Send OTP</button>
                </div>
            ) : (
                <div className="auth-form">
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="auth-button" onClick={verifyOtp}>Verify OTP</button>
                </div>
            )}
            {error && <p className="auth-error">{error}</p>}
        </div>
    );
};

export default LoginPage;

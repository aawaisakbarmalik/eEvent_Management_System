import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const sendOtp = async () => {
        // Simple phone number validation (e.g., basic pattern check)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone.match(phoneRegex)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }

        try {
            await axios.post('/api/auth/send-otp', { phone });
            setStep(2);
            alert('OTP sent successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to send OTP. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('/api/auth/verify-otp', { phone, code: otp });
            localStorage.setItem('token', response.data.token); // Store JWT in localStorage
            alert('Login successful!');
            console.log(response.data.user);
            // Redirect to dashboard or other page if needed
        } catch (error) {
            console.error(error);
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {step === 1 ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default AuthForm;

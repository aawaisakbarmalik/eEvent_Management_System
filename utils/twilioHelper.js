// /backend/utils/twilioHelper.js
const twilio = require('twilio');

// Ensure your environment variables are being loaded correctly from the .env file
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send OTP (One Time Password)
const sendOTP = async (phone) => {
    try {
        // Log the SID and Auth Token for debugging
        console.log('Twilio SID:', process.env.TWILIO_ACCOUNT_SID);
        console.log('Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN);
        console.log('Twilio Service SID:', process.env.TWILIO_SERVICE_SID);

        // Send the OTP using Twilio's Verify service
        return client.verify
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({ to: phone, channel: 'sms' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

// Function to verify OTP
const verifyOTP = async (phone, code) => {
    try {
        return client.verify
            .services(process.env.TWILIO_SERVICE_SID)
            .verificationChecks.create({ to: phone, code });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};

// Function to send general SMS (for event notifications, etc.)
const sendSMS = async (to, body) => {
    try {
        return client.messages.create({
            body,  // Message content
            to,    // Recipient phone number
            from: process.env.TWILIO_PHONE,  // Your Twilio phone number
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};

module.exports = { sendOTP, verifyOTP, sendSMS };

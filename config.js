// /backend/config.js
require('dotenv').config();  // This loads the environment variables from .env

module.exports = {
    mongoURI: process.env.MONGO_URI,
    twilioSID: process.env.TWILIO_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioServiceSID: process.env.TWILIO_SERVICE_SID,
    port: process.env.PORT || 5000
};

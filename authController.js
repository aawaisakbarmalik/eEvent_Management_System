// /backend/controllers/authController.js
const User = require('../models/User');
const { sendOTP, verifyOTP } = require('../utils/twilioHelper');

exports.sendOtp = async (req, res) => {
    const { phone } = req.body;
    try {
        await sendOTP(phone);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phone, code } = req.body;
    try {
        const verification = await verifyOTP(phone, code);
        if (verification.status === 'approved') {
            let user = await User.findOne({ phone });
            if (!user) {
                user = await User.create({ phone, isVerified: true });
            }
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

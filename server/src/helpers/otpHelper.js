export const sendOtpByMail = async (email, otp) => {
    // Implement nodemailer logic or integration
    console.log(`Sending OTP ${otp} to Email: ${email}`);
};

export const sendOtpByWhatsapp = async (mobile, otp) => {
    // Implement WhatsApp API (like Twilio or Gupshup)
    console.log(`Sending OTP ${otp} to WhatsApp: ${mobile}`);
};
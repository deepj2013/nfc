import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpByWhatsapp = async (mobile, otp) => {
  try {
    const base = process.env.WPBOX_ENDPOINT?.replace(/\/$/, '');
    const token = process.env.WPBOX_TOKEN;
    const url = `${base}/api/wpbox/sendtemplatemessage`;

    const payload = {
      token,
      phone: `91${mobile}`,
      template_name: "auth",
      template_language: "en",
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: otp }]
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [{ type: "text", text: otp }]
        }
      ]
    };
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("WhatsApp OTP Sent:", response.data);
    return response.data;

  } catch (err) {
    console.error("Status:", err?.response?.status);
    console.error("Error Data:", err?.response?.data);
    console.error("Error Headers:", err?.response?.headers);
    console.error("Raw Error:", err);
    throw new Error("Failed to send OTP via WhatsApp");
  }
};


export const sendOtpByMail = async (email, otp) => {
    // Implement nodemailer logic or integration
    console.log(`Sending OTP ${otp} to Email: ${email}`);
};
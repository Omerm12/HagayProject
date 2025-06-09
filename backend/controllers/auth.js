import pool from '../db.js';
import dotenv from 'dotenv';
import { Vonage } from '@vonage/server-sdk';
dotenv.config();

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const SMS_FROM = "Vonage APIs"; // או כל שם אחר מאושר לפי Vonage

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await pool.query(
      `INSERT INTO otp_codes (phone, code, expires_at) VALUES ($1, $2, $3)`,
      [phone, code, expiresAt]
    );

    const to = phone.startsWith('+972') ? phone : phone.replace(/^0/, '+972');
 // לדוגמה: 0501234567 ➜ 972501234567

    const text = `קוד ההתחברות שלך: ${code}`;

    await vonage.sms.send({ to, from: SMS_FROM, text })
      .then(response => {
        console.log("Message sent:", response);
        res.json({ message: 'קוד נשלח בהצלחה' });
      })
      .catch(error => {
        console.error("Vonage send error:", error);
        res.status(500).json({ message: 'שליחת קוד נכשלה' });
      });

  } catch (error) {
    console.error("DB error:", error);
    res.status(500).json({ message: 'שליחת קוד נכשלה' });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const now = new Date();

    const result = await pool.query(
      `SELECT * FROM otp_codes WHERE phone = $1 AND code = $2 AND expires_at > $3 ORDER BY id DESC LIMIT 1`,
      [phone, code, now]
    );

    if (result.rows.length > 0) {
      const userResult = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = userResult.rows[0];

      return res.status(200).json({
        id: user.id,
        phone: user.phone,
        email: user.email,
      });
    } else {
      return res.status(401).json({ valid: false, message: 'Invalid or expired code' });
    }
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

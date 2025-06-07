import pool from '../db.js';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await pool.query(
      `INSERT INTO otp_codes (phone, code, expires_at) VALUES ($1, $2, $3)`,
      [phone, code, expiresAt]
    );

    await client.messages.create({
      body: `קוד ההתחברות שלך: ${code}`,
      from: process.env.TWILIO_PHONE,
      to: phone.replace(/^0/, '+972'),
    });

    res.json({ message: 'קוד נשלח בהצלחה' });
  } catch (error) {
    console.error(error);
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
      // ✅ נשלוף את המשתמש מה־DB לפי הטלפון
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
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
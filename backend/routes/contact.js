import express from "express";
import ContactMessage from "../models/contactMessageModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ error: "חסרים פרטים בטופס" });
  }

  try {
    await ContactMessage.create({
      full_name: fullName,
      email,
      phone,
      message,
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("שגיאה בשמירת הפנייה:", err);
    res.status(500).json({ error: "שגיאה בשרת" });
  }
});

export default router;

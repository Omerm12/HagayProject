import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרת תיקייה לשמירת התמונות
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/products'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  },
});
const upload = multer({ storage });

// הנתיב שמטפל בהעלאת תמונה
router.post('/admin/upload-image', upload.single('image'), (req, res) => {
  const fileUrl = `/uploads/products/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;

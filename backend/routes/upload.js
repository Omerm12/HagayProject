import express from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import cloudinary from '../cloudinary.js'; 
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/admin/upload-image', upload.single('image'), async (req, res) => {
  try {
    const streamUpload = (req) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'veggie_shop',
            public_id: req.body.public_id || undefined,
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        Readable.from(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload(req);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('שגיאה בהעלאה ל־Cloudinary:', error);
    res.status(500).json({ error: 'העלאה נכשלה' });
  }
});

export default router;

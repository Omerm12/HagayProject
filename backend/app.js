import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import settlementsRoutes from './routes/settlements.js';
import cartRoutes from './routes/cart.js';
import ordersRoutes from './routes/ordersRoutes.js';
import favoritesRoutes from './routes/favorites.js';
import contactRouter  from './routes/contact.js';
import uploadRoute from './routes/upload.js';

import { adminJs, adminRouter } from './admin.js';

import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

async function start() {
  const app = express();

  app.use(cors({
    origin: [
      "https://hagayproject.vercel.app",
      "http://localhost:3000"
    ],
    credentials: true
  }));

  app.use(express.json());

  // REST API routes
  app.use('/api/users', userRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/settlements', settlementsRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/orders', ordersRoutes);
  app.use('/api/favorites', favoritesRoutes);
  app.use('/api/contact', contactRouter);
  app.use(uploadRoute);

  app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

  // בדיקה אם המשתמש קיים
  app.post("/api/auth/check-user", async (req, res) => {
    try {
      const { phone } = req.body;
      const userRes = await pool.query(`SELECT * FROM users WHERE phone = $1`, [phone]);
      res.json({ exists: userRes.rows.length > 0 });
    } catch (error) {
      console.error("DB error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // ⚠️ חובה להפעיל לפני listen כדי שהקומפוננטות ייבנו
  await adminJs.initialize();
app.use(adminJs.options.rootPath + '/frontend/assets', express.static(path.join(__dirname, '.adminjs')));
  app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}${adminJs.options.rootPath}`);
  });
}

start();

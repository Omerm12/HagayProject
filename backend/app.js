import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import settlementsRoutes from './routes/settlements.js';
import cartRoutes from './routes/cart.js';
import ordersRoutes from './routes/ordersRoutes.js';
import favoritesRoutes from './routes/favorites.js';
import contactRouter  from './routes/contact.js';


import { adminJs, adminRouter } from './admin.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/settlements', settlementsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/contact', contactRouter);

app.use(adminJs.options.rootPath, adminRouter);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

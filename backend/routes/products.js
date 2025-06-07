import express from 'express';
import * as controller from '../controllers/productsController.js';
import Product from '../models/productsModel.js';
import { Op } from "sequelize";


const router = express.Router();

// קבלת כל המוצרים או לפי קטגוריה
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    const where = category ? { category } : {};
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Server error' });
  }  
});

// 🔍 חיפוש לפי כותרת
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  try {
    const products = await Product.findAll({
      where: {
        title: {
          [Op.iLike]: `%${q}%`
        }
      },
      limit: 10
    });

    res.json(products);
  } catch (err) {
    console.error(" שגיאה בחיפוש:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;

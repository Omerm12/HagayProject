import express from 'express';
import * as controller from '../controllers/cart.js';

const router = express.Router();

router.get('/', controller.getCart);         // GET /api/cart?user_id=...
router.post('/add', controller.addItem);     // POST /api/cart/add
router.post('/update', controller.updateItem); // POST /api/cart/update
router.post('/clear', controller.clearCart); // POST /api/cart/clear
router.post('/remove', controller.removeItem);

export default router;

import express from 'express';
import {
  handleCreateOrder,
  handleGetUserOrders,
  handleGetOrderItems,
  getLastOrderItems
} from '../controllers/ordersController.js';

const router = express.Router();

router.post('/', handleCreateOrder);
router.get('/user/:user_id', handleGetUserOrders);
router.get('/:order_id/items', handleGetOrderItems); 
router.get("/last", getLastOrderItems);

export default router;

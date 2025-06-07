import express from 'express';
import { getActiveSettlements } from '../controllers/settlements.js';

const router = express.Router();

router.get('/', getActiveSettlements);

export default router;

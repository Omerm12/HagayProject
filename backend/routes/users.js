import express from 'express';
import {
  registerUser,
  getUserByPhone,
  updateUserById
} from '../controllers/users.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/by-phone/:phone', getUserByPhone);
router.put('/:id', updateUserById);

export default router;

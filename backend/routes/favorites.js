import express from 'express';
import {
  handleAddFavorite,
  handleRemoveFavorite,
  handleGetFavorites
} from '../controllers/favorites.js';

const router = express.Router();

router.get('/user/:user_id', handleGetFavorites);
router.post('/add', handleAddFavorite);
router.post('/remove', handleRemoveFavorite);

export default router;

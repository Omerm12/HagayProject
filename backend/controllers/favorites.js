import {
  addFavorite,
  removeFavorite,
  getFavoritesByUser
} from '../models/favorites.js';

export const handleAddFavorite = async (req, res) => {
  const { user_id, product_id } = req.body;
  try {
    await addFavorite(user_id, product_id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "שגיאה בהוספת מועדף" });
  }
};

export const handleRemoveFavorite = async (req, res) => {
  const { user_id, product_id } = req.body;
  try {
    await removeFavorite(user_id, product_id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "שגיאה בהסרת מועדף" });
  }
};

export const handleGetFavorites = async (req, res) => {
  const { user_id } = req.params;
  try {
    const favorites = await getFavoritesByUser(user_id);
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "שגיאה בשליפת מועדפים" });
  }
};

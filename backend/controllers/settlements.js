import pool from '../db.js';

export const getActiveSettlements = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, district, municipality_name
      FROM settlements
      WHERE is_deliverable = true
      ORDER BY name ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching settlements:", error);
    res.status(500).json({ error: "Server error" });
  }
};

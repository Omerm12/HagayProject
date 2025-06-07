import pool from '../db.js';

export const registerUser = async (req, res) => {
  const { phone, email, full_name } = req.body;

  try {
    const { rowCount } = await pool.query(
      'SELECT 1 FROM users WHERE phone = $1',
      [phone]
    );

    if (rowCount > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const insertQuery = `
      INSERT INTO users (phone, email, full_name, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, full_name, email, phone, created_at
    `;

    const { rows } = await pool.query(insertQuery, [phone, email, full_name]);

    res.status(201).json(rows[0]);

  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserByPhone = async (req, res) => {
  const { phone } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE phone = $1',
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'משתמש לא נמצא' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('שגיאה בשליפת משתמש:', err);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { full_name, email } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name), 
           email = COALESCE($2, email)
       WHERE id = $3
       RETURNING *`,
      [full_name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'משתמש לא נמצא' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('שגיאה בעדכון משתמש:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
};
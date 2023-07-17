const pool = require('../db/connect');

const getWishList = async (req, res) => {
  try {
    const user_id = req.user;

    let wishList = await pool.query(
      'SELECT * FROM products WHERE product_id IN (SELECT product_id FROM wishList WHERE user_id = $1)',
      [user_id]
    );
    wishList = wishList.rows;
    return res.status(200).json(wishList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const addToWishList = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: product_id } = req.params;
    await pool.query('INSERT INTO wishList VALUES ($1,$2)', [
      user_id,
      product_id,
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const user_id = req.user;
    const { id: product_id } = req.params;

    await pool.query(
      'DELETE FROM wishList WHERE user_id = $1 AND product_id = $2',
      [user_id, product_id]
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

module.exports = {
  getWishList,
  addToWishList,
  removeFromWishList,
};

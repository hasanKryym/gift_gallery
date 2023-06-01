const pool = require('../db/connect');

const checkAdmin = async (req, res, next) => {
  try {
    const user_id = req.user;
    const user = await pool.query(
      'SELECT admin_id FROM admin WHERE user_id = $1',
      [user_id]
    );

    if (user.rows.length !== 0) next();
    else
      return res
        .status(403)
        .json({ msg: 'admin only have access to this page' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

module.exports = checkAdmin;

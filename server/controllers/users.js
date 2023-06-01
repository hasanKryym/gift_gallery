const pool = require('../db/connect');

const getUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users;');
    return res.status(200).json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const getUser = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      user_id,
    ]);

    return res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: user_id } = req.params;
    const { user_name, user_number, user_address } = req.body;
    const flag = user_name && user_number && user_address;

    if (flag) {
      await pool.query(
        'UPDATE users SET user_name = $1, user_number = $2, user_address = $3',
        [user_name, user_number, user_address]
      );

      return res
        .status(200)
        .json({ success: true, msg: 'user updated successfully' });
    } else
      return res
        .status(200)
        .json({ success: false, msg: 'please fill all the inputs' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
};

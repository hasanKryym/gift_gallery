const pool = require('../db/connect');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const register = async (req, res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    const { user_name, user_email, user_password, user_address, user_number } =
      req.body;

    // 2. check if user exist
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      user_email,
    ]);

    if (user.rows.length !== 0) {
      return res
        .status(401)
        .json({ success: false, msg: 'user already exists' });
    }

    // 3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(user_password, salt);

    // 4. enter the new user inside our database

    const newUser = await pool.query(
      'INSERT INTO users(user_name, user_email, user_password, user_address, user_number) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [user_name, user_email, bcryptPassword, user_address, user_number]
    );

    // 5. generting jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token, user_id: newUser.rows[0].user_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const login = async (req, res) => {
  // 1. destructure req.body
  const { user_email, user_password } = req.body;

  // 2. check if user exists
  const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
    user_email,
  ]);

  if (user.rows.length === 0) {
    return res
      .status(401)
      .json({ success: false, msg: 'password or email is incorrect' });
  }

  // 3. check if incoming password is the same as the database password
  const validPassword = await bcrypt.compare(
    user_password,
    user.rows[0].user_password
  );

  if (!validPassword) {
    return res
      .status(401)
      .json({ success: false, msg: 'password or email is incorrect' });
  }

  // 4. asign a jwt token
  const token = jwtGenerator(user.rows[0].user_id);
  let user_id = await pool.query(
    'SELECT user_id FROM users WHERE user_email = $1',
    [user_email]
  );
  user_id = user_id.rows[0].user_id;
  res.json({ token, user_id });
};

const adminStatus = async (req, res) => {
  try {
    const user_id = req.user;
    const user = await pool.query(
      'SELECT admin_id FROM admin WHERE user_id = $1',
      [user_id]
    );
    if (user.rows.length !== 0) return res.status(200).send(true);
    else return res.status(200).send(false);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error' });
  }
};

module.exports = {
  register,
  login,
  adminStatus,
};

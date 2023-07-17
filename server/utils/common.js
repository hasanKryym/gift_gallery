const pool = require('../db/connect');

const getCategory = async (category_id) => {
  const category = await pool.query(
    'SELECT category_name FROM category WHERE category_id = $1',
    [category_id]
  );

  return category.rows[0].category_name;
};

module.exports = {
  getCategory,
};

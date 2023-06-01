const pool = require('../db/connect');
const { getCategory } = require('../utils/common');

const getProducts = async (req, res) => {
  try {
    let productsArr = [];
    let products = await pool.query('SELECT * FROM products');
    products = products.rows;

    const productsPromise = new Promise((resolve, reject) => {
      products.map(async (product, i) => {
        const category_id = product.category_id;
        const category_name = await getCategory(category_id);
        const newProduct = { ...product, category_id: category_name };
        productsArr.push(newProduct);
        if (products[i + 1] === undefined) resolve();
      });
    });

    productsPromise
      .then(() => res.status(200).json(productsArr))
      .catch((err) => res.status(500).json({ success: false, msg: err }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: product_id } = req.params;
    const product = await pool.query(
      'SELECT * FROM products WHERE product_id = $1',
      [product_id]
    );

    const category_id = product.rows[0].category_id;
    const category_name = await getCategory(category_id);

    const newProduct = { ...product.rows[0], category_id: category_name };
    return res.status(200).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const recommended = await pool.query(
      'SELECT * FROM products WHERE product_id IN (SELECT product_id FROM recommended)'
    );

    return res.status(200).json(recommended.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_desc,
      product_price,
      product_category,
      product_image,
    } = req.body;

    const flag =
      product_name &&
      product_desc &&
      product_price &&
      product_category &&
      product_image;

    if (flag) {
      await pool.query(
        'INSERT INTO products (product_name, product_desc, product_price, category_id, product_image) VALUES ($1, $2)',
        [
          product_name,
          product_desc,
          product_price,
          product_category,
          product_image,
        ]
      );

      return res
        .status(200)
        .json({ success: true, msg: 'product added successfully' });
    }

    return res
      .status(400)
      .json({ success: false, msg: 'please provide all required data' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const filterByCategory = async (req, res) => {
  try {
    const { id: category_id } = req.params;
    let filteredProducts = await pool.query(
      'SELECT * FROM products WHERE category_id = $1',
      [category_id]
    );

    return res.status(200).json(filteredProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const filterByPrice = async (req, res) => {
  try {
    const range = req.body;
    const filteredProducts = await pool.query(
      'SELECT * FROM products WHERE product_price BETWEEN $1 AND $2',
      [range.min, range.max]
    );
    return res.status(200).json(filteredProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

const countProducts = async (req, res) => {
  try {
    let countAllProducts = await pool.query(
      'SELECT COUNT(product_id) FROM products'
    );

    let countMaleProducts = await pool.query(
      "SELECT COUNT(product_id) FROM products WHERE category_id = 'ec497a7b-cfb1-4dd0-98b2-4a285b801c28'"
    );

    let countFemaleProducts = await pool.query(
      "SELECT COUNT(product_id) FROM products WHERE category_id = '49557c7d-caa6-4450-8dae-64346a23d6bf'"
    );

    const countedData = {
      countAllProducts: countAllProducts.rows[0].count,
      countMaleProducts: countMaleProducts.rows[0].count,
      countFemaleProducts: countFemaleProducts.rows[0].count,
    };

    res.status(200).json(countedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
};

module.exports = {
  getProducts,
  getProduct,
  getRecommendedProducts,
  addProduct,
  filterByCategory,
  filterByPrice,
  countProducts,
};

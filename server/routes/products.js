const express = require('express');
const router = express.Router();

const authorize = require('../middleware/authorization');
const {
  getProducts,
  addProduct,
  getProduct,
  getRecommendedProducts,
  filterByCategory,
  filterByPrice,
  countProducts,
} = require('../controllers/products');
const checkAdmin = require('../middleware/checkAdmin');

router.route('/').get(getProducts).post(authorize, checkAdmin, addProduct);
router.route('/:id').get(getProduct);
router.route('/filter/recommended').get(getRecommendedProducts);
router.route('/filter/category/:id').get(filterByCategory);
router.route('/filter/price').get(filterByPrice);
router.route('/filter/count').get(countProducts);

module.exports = router;

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
  editProduct,
  deleteProduct,
  addToRecommendedProducts,
  removeFromRecommended,
} = require('../controllers/products');
const checkAdmin = require('../middleware/checkAdmin');

router.route('/').get(getProducts).post(authorize, checkAdmin, addProduct);
router
  .route('/:id')
  .get(getProduct)
  .patch(authorize, checkAdmin, editProduct)
  .delete(authorize, checkAdmin, deleteProduct);
router.route('/filter/recommended').get(getRecommendedProducts);
router
  .route('/filter/recommended/:id')
  .post(addToRecommendedProducts)
  .delete(removeFromRecommended);
router.route('/filter/category/:id').get(filterByCategory);
router.route('/filter/price').get(filterByPrice);
router.route('/filter/count').get(countProducts);

module.exports = router;

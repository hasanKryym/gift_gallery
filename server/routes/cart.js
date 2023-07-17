const express = require('express');
const checkAdmin = require('../middleware/checkAdmin');
const {
  getCart,
  addToCart,
  deleteFromCart,
  updateCart,
} = require('../controllers/cart');
const router = express.Router();

router.route('/').get(getCart);
router.route('/:id').post(addToCart).delete(deleteFromCart).patch(updateCart);
module.exports = router;

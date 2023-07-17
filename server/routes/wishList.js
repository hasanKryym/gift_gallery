const express = require('express');
const {
  getWishList,
  addToWishList,
  removeFromWishList,
} = require('../controllers/wishList');
const router = express.Router();

router.route('/').get(getWishList);
router.route('/:id').post(addToWishList).delete(removeFromWishList);

module.exports = router;

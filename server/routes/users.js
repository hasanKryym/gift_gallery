const express = require('express');
const { getUsers, getUser, updateUser } = require('../controllers/users');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();

router.route('/').get(checkAdmin, getUsers);
router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;

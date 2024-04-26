const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productdetail.controller');

// Route to display product detail
router.get('/:id', productDetailController.showProductDetail);

module.exports = router;
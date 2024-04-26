const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Display cart page
router.get('/', cartController.displayCartPage);

// Add product to cart
router.post('/add', cartController.addToCart);

// Remove product from cart
router.post('/remove', cartController.removeFromCart);

// Checkout (empty cart)
router.post('/checkout', cartController.checkout);

module.exports = router;

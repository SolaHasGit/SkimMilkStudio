const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Route for displaying all products
router.get('/', productsController.showAllProducts);

// Route for displaying products by category
router.get('/category/:categoryId', productsController.showProductsByCategory);

// Route for displaying a single product
router.get('/productdetail', productsController.showProductById);

// Route for creating a new product
router.post('/', productsController.createProduct);

// Route for searching products
router.get('/search', productsController.searchProducts);

// Route for deleting a product
router.delete('/:id', productsController.deleteProduct);

// Route for updating a product
router.put('/:id', productsController.updateProduct);

module.exports = router;

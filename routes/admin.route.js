const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

// Route to render the admin page
router.get('/', adminController.renderAdminPage);


// Route to add a new product
router.post('/add-product', adminController.addProduct);

// Route to update an existing product
router.post('/update-product', adminController.updateProduct);

// Route to delete a product
router.delete('/delete-product/:productId', adminController.deleteProduct);
module.exports = router;
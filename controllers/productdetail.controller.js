const ProductDetail = require('../models/productdetail.model');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Controller function to handle displaying product detail
async function showProductDetail(req, res) {
    try {
        const productId = req.params.id;
        const productDetail = await ProductDetail.getProductById(productId); // Updated method name

        if (productDetail) {
            res.render('productdetail', { productDetail });
        } else {
            res.status(404).send('Product detail not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving product detail: ' + error.message);
    }
}

module.exports = {
    showProductDetail
};

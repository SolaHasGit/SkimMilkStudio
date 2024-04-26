// products.controller.js
const Product = require('../models/products.model');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Display all products
async function showAllProducts(req, res) {
    try {
        const products = await Product.listAllProducts();
        res.render('products', { products }); 
    } catch (error) {
        res.status(500).send('Error retrieving products: ' + error.message);
    }
}

// Display products by category
async function showProductsByCategory(req, res) {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.listProductsByCategory(categoryId);
        res.render('products/categoryProducts', { products }); // Path to the view for products by category
    } catch (error) {
        res.status(500).send('Error retrieving products by category: ' + error.message);
    }
}

// Display a single product
async function showProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.getProductById(productId);
        if (product) {
            res.render('productdetail', { product }); // Path to the product detail view
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving product: ' + error.message);
    }
}

// Create a new product
async function createProduct(req, res) {
    try {
        const newProduct = req.body;
        await Product.addProduct(newProduct);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Error adding product: ' + error.message);
    }
}

// Search for products
async function searchProducts(req, res) {
    try {
        const keyword = req.query.keyword;
        const products = await Product.searchProducts(keyword);
        res.render('products/searchResults', { products });

    } catch (error) {
        res.status(500).send('Error searching products: ' + error.message);
    }
}

// Delete a product
async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        await Product.removeProductById(productId);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send('Error deleting product: ' + error.message);
    }
}

// Update an existing product
async function updateProduct(req, res) {
    try {
        const updatedProduct = req.body;
        await Product.updateProduct(updatedProduct);
        res.redirect(`/products/${updatedProduct.id}`);
    } catch (error) {
        res.status(500).send('Error updating product: ' + error.message);
    }
}

module.exports = {
    showAllProducts,
    showProductsByCategory,
    showProductById,
    createProduct,
    searchProducts,
    deleteProduct,
    updateProduct
};

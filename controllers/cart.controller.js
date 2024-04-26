const CartProduct = require('../models/cartProduct.model');
const Product = require('../models/products.model');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

async function displayCartPage(req, res) {
    const userID = '1'; // Assuming only one user for now

    try {
        // Fetch products
        const products = await Product.listAllProducts();
        
        // Fetch cart contents
        const cartContents = await CartProduct.getCartContents(userID);
        
        // Render the cart page with products and cart contents
        res.render('cart', { products, cartContents });
    } catch (err) {
        console.error('Error fetching cart contents:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Add a product to the cart
async function addToCart(req, res) {
    const { productID, numItems } = req.body;
    const userID = '1'; // Assuming only one user for now
    const id = 1;
    try {
        await CartProduct.addToCart(id, userID, productID, numItems);
        res.redirect('/cart');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function removeFromCart(req, res) {
    const { productID } = req.body;
    const userID = '1'; // Assuming only one user for now

    try {
        await CartProduct.removeFromCart(productID, userID);
        res.redirect('/cart');
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function checkout(req, res) {
    const userID = '1'; // Assuming only one user for now

    try {
        await CartProduct.emptyCart(userID);
        res.redirect('/cart');
    } catch (err) {
        console.error('Error emptying cart:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    displayCartPage,
    addToCart,
    removeFromCart,
    checkout,
};

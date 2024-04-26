const db = require('../models/connectdb');

// Add a product to the cart
async function addToCart(id, userID, productID, numItems) {
    return await db.run('INSERT INTO cartProducts (id, cartID, productID, numItems) VALUES ((SELECT id FROM cart WHERE userID = ?), ?, ?)', id, userID, productID, numItems);
}

// Remove a product from the cart
async function removeFromCart(productID, userID) {
    return await db.run('DELETE FROM cartProducts WHERE productID = ? AND cartID = (SELECT id FROM cart WHERE userID = ?)', productID, userID);
}

// Empty the cart for a user
async function emptyCart(userID) {
    return await db.run('DELETE FROM cartProducts WHERE cartID = (SELECT id FROM cart WHERE userID = ?)', userID);
}

// Retrieve cart contents for a user
async function getCartContents(userID) {
    let sql = "SELECT * FROM cartProducts WHERE cartID = (SELECT id FROM cart WHERE userID = ?);";
    return await db.all(sql, userID);
}

module.exports = {
    addToCart,
    removeFromCart,
    emptyCart,
    getCartContents
};

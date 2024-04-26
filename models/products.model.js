const db = require('../models/connectdb'); // Ensure this is correctly pointing to your database connection file

// Retrieve all products from the database
function listAllProducts() {
    let sql = "SELECT * FROM products;";
    return db.all(sql);
}

// Retrieve all products by category from the database
function listProductsByCategory(categoryId) {
    let sql = "SELECT * FROM products WHERE categoryID = ? ORDER BY productName;";
    return db.all(sql, categoryId);
}

// Retrieve a single product by ID from the database
function getProductById(id) {
    let sql = "SELECT * FROM products WHERE id = ?;";
    return db.get(sql, id);
}

// Create a new product in the database
function addProduct(product) {
    let sql = 'INSERT INTO products (id, productName, productDescription, imageURL, price, featuredProduct, categoryID) ' +
              'VALUES (? ,?, ?, ?, ?, ?, ?);';
    return db.run(sql, product.id, product.productName, product.productDescription, product.imageURL, product.price, product.featuredProduct, product.categoryID);
}

// Search for products by name or description in the database
function searchProducts(keyword) {
    let sql = 'SELECT * FROM products WHERE productName LIKE ? OR productDescription LIKE ?;';
    return db.all(sql, `%${keyword}%`, `%${keyword}%`);
}

// Delete a product by ID from the database
function removeProductById(id) {
    let sql = 'DELETE FROM products WHERE id = ?;';
    return db.run(sql, id);
}

// Update an existing product's details in the database
function updateProduct(product) {
    let sql = 'UPDATE products SET productName = ?, productDescription = ?, imageURL = ?, price = ?, featuredProduct = ?, categoryID = ? WHERE id = ?;';
    return db.run(sql, product.productName, product.productDescription, product.imageURL, product.price, product.featuredProduct, product.categoryID, product.id);
}

module.exports = {
    listAllProducts,
    listProductsByCategory,
    getProductById,
    addProduct,
    searchProducts,
    removeProductById,
    updateProduct,
};

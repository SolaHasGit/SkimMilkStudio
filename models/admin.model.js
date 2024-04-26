const db = require('../models/connectdb');

// Function to add a product by admin
function adminAddProduct(products) {
    let sql = 'INSERT INTO products (id, productName, productDescription, imageURL, price, featuredProduct, categoryID) ' +
              'VALUES (?, ?, ?, ?, ?, ?, ?);';
    return db.run(sql, products.id, products.productName, products.productDescription, products.imageURL, products.price, products.featuredProduct, products.categoryID);
}

// Function to update a product by admin
function adminUpdateProduct(products) {
    let sql = 'UPDATE products SET productName = ?, productDescription = ?, imageURL = ?, price = ?, featuredProduct = ?, categoryID = ? WHERE id = ?;';
    return db.run(sql, products.productName, products.productDescription, products.imageURL, products.price, products.featuredProduct, products.categoryID, products.id);
}

// Function to delete a product by admin
function adminDeleteProduct(id) {
    let sql = 'DELETE FROM products WHERE id = ?;';
    return db.run(sql, id);
}

module.exports = {
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct
};

const db = require('../models/connectdb');

// Retrieve a single product by ID from the database
function getProductById(id) {
    let sql = "SELECT * FROM products WHERE id = ?;";
    return db.get(sql, id);
}

module.exports = {
    getProductById
};
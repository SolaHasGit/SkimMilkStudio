const Admin = require('../models/admin.model');
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

function renderAdminPage(req, res) {
    res.render('admin');
}

exports.addProduct = async (req, res) => {
    try {
      const { id, productName, productDescription, imageURL, price, featuredProduct, categoryID } = req.body;
      const productData = {
        id,
        productName,
        productDescription,
        imageURL,
        price,
        featuredProduct,
        categoryID
      };
      await Admin.adminAddProduct(productData);
      res.status(201).send('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).send('Server error');
    }
  };


// Controller function to update a product
exports.updateProduct = async (req, res) => {
    try {
      const { productId, updatedProductName, updatedProductDescription, updatedImageURL, updatedPrice, updatedFeaturedProduct, updatedCategoryID } = req.body;
      const productData = {
        id: productId,
        productName: updatedProductName,
        productDescription: updatedProductDescription,
        imageURL: updatedImageURL,
        price: updatedPrice,
        featuredProduct: updatedFeaturedProduct,
        categoryID: updatedCategoryID
      };
      await Admin.adminUpdateProduct(productData);
      res.status(200).send('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Server error');
    }
  };

// Controller function to delete a product
exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      await Admin.adminDeleteProduct(productId);
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Server error');
    }
  };

module.exports = {
    renderAdminPage
};
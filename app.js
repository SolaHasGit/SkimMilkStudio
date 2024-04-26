const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sqlite = require('better-sqlite3');
const db = sqlite('skimmilkDB/skimmilk.db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route handler to render the index.ejs view
app.get('/', (req, res) => {
    // Data to pass to the view (optional)
    const data = {
        pageTitle: 'Welcome to SkimMilk Studio'
    };
    // Render the index.ejs view with data (if any)
    res.render('index', data);
});

// Routes for showing all products
const productsRouter = require("./routes/products.route");
app.use("/products", productsRouter);
const cartRouter = require("./routes/cart.route");
app.use("/cart", cartRouter);
//const adminRouter = require("./routes/admin.route");
//app.use("/admin", adminRouter);


app.get('/productdetail', (req, res) => {
    // Data to pass to the view
    const productData = {
        productName: 'B L U E ~ C O W ~ S T I C K E R',
        productDescription: 'Our dear mascot! This cute blue cow and his sister pink cow are the faces of my brand. Who doesn\'t love a baby cow... You won\'t be able to mOO-ve on!',
        productPrice: '$2.99',
        productCategory: 'Stickers',
        productCharacter: 'Blue Cow',
        productImageURL: 'images/Stickers/Blue_Cow.PNG'
    };
    // Render the productdetail.ejs view with productData
    res.render('productdetail', { productData });
});

// Route for adding a product in admin
app.post('/add-product', (req, res) => {
    const { id, productName, productDescription, imageURL, price, featuredProduct, categoryID } = req.body;

    try {
        // Insert form data into database
        const stmt = db.prepare('INSERT INTO products (id, productName, productDescription, imageURL, price, featuredProduct, categoryID) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt.run(id, productName, productDescription, imageURL, price, featuredProduct, categoryID);

        // Respond with success message
        res.send('Product added successfully');
    } catch (error) {
        console.error('Error:', error);
        // Respond with error message
        res.status(500).send('Failed to add product');
    }
});

// Route for deletion of product in admin
app.delete('/delete-product/:id', (req, res) => {
    const productId = req.params.id;

    try {
        // Execute SQL DELETE query to remove product from database
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(productId);

        if (result.changes > 0) {
            // Product deleted successfully
            res.send('Product deleted successfully');
        } else {
            // No product found with the given ID
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error:', error);
        // Respond with error message
        res.status(500).send('Failed to delete product');
    }
});

// Route for bulk upload of JSON files
// Utilize multer for uploads
const upload = multer({ dest: 'uploads/' });
app.post('/bulk-upload', upload.array('jsonFiles'), (req, res) => {
    const files = req.files;
    try {
        files.forEach(file => {
            const filePath = file.path;
            const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const stmt = db.prepare('INSERT INTO products (id, productName, productDescription, imageURL, price, featuredProduct, categoryID) VALUES (?, ?, ?, ?, ?, ?, ?)');
            jsonData.forEach(item => {
                stmt.run(item.id, item.productName, item.productDescription, item.imageURL, item.price, item.featuredProduct, item.categoryID);
            });
        });
        res.send('JSON files uploaded and data inserted into database successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to upload JSON files');
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
-- Create the "users" table
CREATE TABLE users (
    id INT PRIMARY KEY,
    dateCreated DATETIME NOT NULL,
    nameOfUser VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    passwordOfUser VARCHAR(40) NOT NULL,
    userType VARCHAR(7) NOT NULL
);

-- Create the "categories" table
CREATE TABLE categories (
    id INT PRIMARY KEY,
    categoryName VARCHAR(30) NOT NULL,
    hierarchy INT NOT NULL
);

-- Create the "cart" table
CREATE TABLE cart (
    id INT PRIMARY KEY,
    cartStatus VARCHAR(10),
    dateCreated DATETIME,
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(id)
);

-- Create the "products" table
CREATE TABLE products (
    id INT PRIMARY KEY,
    productName VARCHAR(30) NOT NULL UNIQUE,
    productDescription VARCHAR(300) NOT NULL,
    imageURL VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    featuredProduct VARCHAR(3) NULL,
    categoryID INT NOT NULL,
    FOREIGN KEY (categoryID) REFERENCES categories(id)
);

-- Create the "cartProducts" table
CREATE TABLE cartProducts (
    id INT PRIMARY KEY,
    cartID INT,
    productID INT,
    numItems INT,
    FOREIGN KEY (cartID) REFERENCES cart(id),
    FOREIGN KEY (productID) REFERENCES products(id)
);

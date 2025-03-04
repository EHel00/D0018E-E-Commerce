const { create } = require("domain");

const Query = {
    //product
    getAllProducts: 'SELECT * FROM Product',
    getProductById: 'SELECT * FROM Product WHERE idProduct = ?',
    getProductPrice: 'SELECT Product.Price FROM Product WHERE idProduct = ?',
    insertProduct: 'INSERT INTO Product(Category, Size, Price) VALUES (?, ?, ?)',
    //updateProduct: 'UPDATE Product (Category, Size, Price) WHERE idProduct = ?',
    deleteProduct: 'DELETE FROM Product WHERE id = ?',
    getProductsByCategory: 'SELECT * FROM Product WHERE Category = ?',

    //supply
    insertSupply: 'INSERT INTO Supply (Product, Quantity) VALUES (?, ?)',
    updateSupply: 'UPDATE Supply SET Quantity = ? WHERE Product = ?',
    getAllSupply: 'SELECT * FROM Supply',
    getSupply: 'SELECT * FROM Supply WHERE idSupply = ?',
    getSupplyByProductId: 'SELECT * FROM Supply WHERE Product = ?',

    //Category Queries
    insertCategory: 'INSERT INTO Category (description, image) VALUES (?, ?)',
    getCategory: 'SELECT * FROM Category WHERE CategoryID = ?',
    getAllCategories: 'SELECT * FROM Category',
    getAllProductsInC: 'SELECT Category.Description, Category.Image, Product.Size, Product.Price, Product.idProduct FROM Category JOIN Product ON Category.CategoryID = Product.Category WHERE Category.CategoryID = ? ORDER BY Product.Size ASC',

    //User Queries
    selectUser: 'SELECT * FROM User;',
    selectUserById: 'SELECT * FROM User WHERE idUser = ?',
    createUser: 'INSERT INTO User (Email, Password, PhoneNumber, FirstName, LastName, Address) VALUES (?, ?, ?, ?, ?, ?)',
    selectUserByEmail: 'SELECT * FROM User WHERE Email = ?',

    //Order Queries
    addOrder: 'INSERT INTO Orders (OrderHistory, Product, Quantity) VALUES (?, ?, ?)',

    createOrderHistory: 'INSERT INTO OrderHistory (User, Date, Status) VALUES (?, ?, ?)',
    getOrderHistory: 'SELECT * FROM OrderHistory WHERE idOrderHistory = ?',
    getOrderHistoryByUser: 'SELECT * FROM OrderHistory WHERE User = ?',
    updateOrderHistoryTotal: 'UPDATE OrderHistory set TotalPrice = ? WHERE idOrderHistory = ?',



    //Shopping Cart Queries
    fancyGetCart: 'SELECT * FROM ShoppingCart JOIN Product ON ShoppingCart.Product = Product.idProduct JOIN Category on Category.CategoryID = Product.Category WHERE User = ?',
    findCartByUser: 'SELECT * FROM ShoppingCart WHERE User = ?',
    findProdInCartByUser: 'SELECT Product FROM ShoppingCart WHERE User = ?',
    addToCart: 'INSERT INTO ShoppingCart(User, Product, Quantity) VALUES (?, ?, ?)',
    updateValueInCart: 'UPDATE ShoppingCart SET Quantity = ? WHERE User = ? and Product = ?',
    removeFromCart: 'DELETE FROM ShoppingCart WHERE User = ? AND Product = ?',
    removeUserCart: 'DELETE FROM ShoppingCart WHERE User = ?',
    getCartAndSupply: 'SELECT ShoppingCart.Quantity as CartQuantity, Supply.Quantity as SupplyQuantity, ShoppingCart.idShoppingCart, ShoppingCart.User, Supply.idSupply, ShoppingCart.Product FROM ShoppingCart JOIN Supply ON ShoppingCart.Product = Supply.Product WHERE ShoppingCart.User = ?',

    //Grade Queries
    getGrades: 'SELECT Grade.Grade, Grade.Comment, User.FirstName as User FROM Grade JOIN User ON User.idUser = Grade.User WHERE Category = ?',
    addGrade: 'INSERT INTO Grade (User, Category, Grade, Comment) VALUES (?, ?, ?, ?)',
}



module.exports = Query;
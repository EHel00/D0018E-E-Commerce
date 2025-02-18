const Query = {
    //product
    getAllProducts: 'SELECT * FROM Product',
    getProductById: 'SELECT * FROM Product WHERE idProduct = ?',
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

    //User Queries
    selectUser: 'SELECT * FROM User;',
    selectUserById: 'SELECT * FROM User WHERE idUser = ?',
    createUser: 'INSERT INTO User (Email, Password, PhoneNumber, FirstName, LastName, Address) VALUES (?, ?, ?, ?, ?, ?)',
    selectUserByEmail: 'SELECT * FROM User WHERE Email = ?',

    //Order Queries

    //Shopping Cart Queries
    createShoppingCart: 'INSERT INTO ShoppingCart (User, Order) VALUES (?, ?)',

}



module.exports = Query;
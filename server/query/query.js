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
    getAllProductsInC: 'SELECT Category.Description, Category.Image, Product.Size, Product.Price, Product.idProduct FROM Category JOIN Product ON Category.CategoryID = Product.Category WHERE Category.CategoryID = ? ORDER BY Product.Size ASC',

    //User Queries
    selectUser: 'SELECT * FROM User;',
    selectUserById: 'SELECT * FROM User WHERE idUser = ?',
    createUser: 'INSERT INTO User (Email, Password, PhoneNumber, FirstName, LastName, Address) VALUES (?, ?, ?, ?, ?, ?)',
    selectUserByEmail: 'SELECT * FROM User WHERE Email = ?',

    //Order Queries

    //Shopping Cart Queries
    //createShoppingCart: 'INSERT INTO ShoppingCart (User) VALUES (?)',
    findCartByUser: 'SELECT * FROM ShoppingCart WHERE User = ?',
    addToCart: 'INSERT INTO ShoppingCart(User, Product, Quantity) VALUES (?, ?, ?)',
    updateValueInCart: 'UPDATE ShoppingCart SET Quantity = ? WHERE User = ? and Product = ?',
    removeFromCart: 'DELETE FROM ShoppingCart WHERE User = ? AND Product = ?',

}



module.exports = Query;
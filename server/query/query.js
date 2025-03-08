const Query = {
    //product
    getAllProducts: 'SELECT * FROM Product',
    getProductById: 'SELECT * FROM Product WHERE idProduct = ?',
    getProductPrice: 'SELECT Product.Price FROM Product WHERE idProduct = ?',
    insertProduct: 'INSERT INTO Product(Category, Size, Price) VALUES (?, ?, ?)',
    updateProduct: 'UPDATE Product SET Size = ?, Price = ? WHERE idProduct = ?',
    deleteProduct: 'DELETE FROM Product WHERE idProduct = ?',
    getProductsByCategory: 'SELECT * FROM Product WHERE Category = ?',
    updateProduct: 'UPDATE Product SET Size = ?, Price = ? WHERE idProduct = ?',
    //supply
    insertSupply: 'INSERT INTO Supply (Product, Quantity) VALUES (?, ?)',
    updateSupply: 'UPDATE Supply SET Quantity = ? WHERE Product = ?',
    getAllSupply: 'SELECT * FROM Supply',
    getSupply: 'SELECT * FROM Supply WHERE idSupply = ?',
    getSupplyByProductId: 'SELECT * FROM Supply WHERE Product = ?',

    //Category Queries
    insertCategory: 'INSERT INTO Category (description, image) VALUES (?, ?)',
    getCategory: 'SELECT * FROM Category WHERE CategoryID = ?',
    deleteCategory: 'DELETE FROM Category WHERE CategoryID = ?',
    getAllCategories: 'SELECT * FROM Category',
    getAllProductsInC: 'SELECT Category.Description, Category.Image, Product.Size, Product.Price, Product.idProduct, Supply.Quantity FROM Category JOIN Product ON Category.CategoryID = Product.Category JOIN Supply ON Supply.Product = Product.idProduct WHERE Category.CategoryID = ? ORDER BY Product.Size ASC',

    //User Queries
    selectUser: 'SELECT * FROM User;',
    selectUserById: 'SELECT * FROM User WHERE idUser = ?',
    createUser: 'INSERT INTO User (Email, Password, PhoneNumber, FirstName, LastName, Address) VALUES (?, ?, ?, ?, ?, ?)',
    selectUserByEmail: 'SELECT * FROM User WHERE Email = ?',
    updateUser: 'UPDATE User SET Password = ?, PhoneNumber = ?, FirstName = ?, LastName = ?, Address = ? WHERE idUser = ?',

    //Role Queries
    selectRole: 'SELECT * FROM Role;',
    selectRoleByUser: 'SELECT * FROM Role WHERE User = ?;',
    insertRole: 'INSERT INTO Role (User, Role) VALUES (?, ?)',

    //Order Queries
    addOrder: 'INSERT INTO Orders (OrderHistory, Quantity, Description, Size, Price) VALUES (?, ?, ?, ?, ?)',
    getOrder: 'SELECT * FROM Orders WHERE OrderHistory = ?',

    createOrderHistory: 'INSERT INTO OrderHistory (User, Date, Status) VALUES (?, ?, ?)',
    getOrderHistory: 'SELECT * FROM OrderHistory',
    getOrderHistoryByUser: 'SELECT * FROM OrderHistory WHERE User = ?',
    updateOrderHistoryTotal: 'UPDATE OrderHistory set TotalPrice = ? WHERE idOrderHistory = ?',
    updateOrderHistoryStatus: 'UPDATE OrderHistory SET Status = ? WHERE idOrderHistory = ?',

    //Shopping Cart Queries
    fancyGetCart: 'SELECT *, Supply.Quantity as Stock FROM ShoppingCart JOIN Product ON ShoppingCart.Product = Product.idProduct JOIN Category on Category.CategoryID = Product.Category JOIN Supply on Product.idProduct = Supply.Product WHERE User = ?',
    findCartByUser: 'SELECT * FROM ShoppingCart WHERE User = ?',
    findProdInCartByUser: 'SELECT Product FROM ShoppingCart WHERE User = ?',
    addToCart: 'INSERT INTO ShoppingCart(User, Product, Quantity) VALUES (?, ?, ?)',
    updateValueInCart: 'UPDATE ShoppingCart SET Quantity = ? WHERE User = ? and Product = ?',
    removeFromCart: 'DELETE FROM ShoppingCart WHERE User = ? AND Product = ?',
    removeUserCart: 'DELETE FROM ShoppingCart WHERE User = ?',
    getCartAndSupply: 'SELECT *, ShoppingCart.Quantity as CartQuantity, Supply.Quantity as SupplyQuantity FROM ShoppingCart JOIN Supply ON ShoppingCart.Product = Supply.Product JOIN Product ON Product.idProduct = ShoppingCart.Product JOIN Category ON Category.CategoryID = Product.Category WHERE ShoppingCart.User = ?',

    //Grade Queries
    getGrades: 'SELECT Grade.Grade, Grade.Comment, User.FirstName as User FROM Grade JOIN User ON User.idUser = Grade.User WHERE Category = ?',
    addGrade: 'INSERT INTO Grade (User, Category, Grade, Comment) VALUES (?, ?, ?, ?)',
}



module.exports = Query;
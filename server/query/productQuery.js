const PQuery = {
    getAllProducts: 'SELECT * FROM Product',
    getProductById: 'SELECT * FROM Product WHERE idProduct = ?',
    insertProduct: 'INSERT INTO Product(Category, Size, Price) VALUES (?,?,?)', 
    updateProduct: 'UPDATE Product (Category, Size, Price) WHERE idProduct = ?',
    deleteProduct: 'DELETE FROM product WHERE id = ?',
    
    //Category Queries
    insertCategory: 'INSERT INTO Category (description, image) VALUES (?,?)'
}



module.exports = PQuery;
const PQuery = {
    getAllProducts: 'SELECT * FROM Product',
    getProductById: 'SELECT * FROM Product WHERE id = ?',
    insertProduct: 'INSERT INTO Product(Category, Size, Price) Select (?,?,?)', 
    updateProduct: 'UPDATE Product (Category, Size, Price) WHERE id = ?',
    deleteProduct: 'DELETE FROM product WHERE id = ?'
}

module.exports = PQuery;
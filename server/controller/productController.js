const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/productQuery");


const getProducts = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching products`);
        db.query(QUERY.getAllProducts, (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(404).json({message: 'Products not found'});
        } else {
            res.status(200).json({message: 'Products found', data: results});
    }
  });
};


const getProduct = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching product`);
        db.query(QUERY.getProductById, [req.params.id], (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            res.status(404).json({message: 'Product not found'});

        } else {
        res.status(200).json({message: 'Product found', data: results[0]});
    }
  });
};

const createCategory = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, catching Category`);
    db.query(QUERY.insertCategory, Object.values(req.body), (error, results) => { 
        if (!results) {
            logger.error(error.message);
            res.status(400).json({message: 'Error'});
        } else {
            res.status(201).json({message: 'Category Created'});
        }
    });
}
const createProduct = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, catching Category`);
    db.query(QUERY.insertProduct, Object.values(req.body), (error, results) => { 
        if (!results) {
            logger.error(error.message);
            res.status(400).json({message: 'Error'});
        } else {
            res.status(201).json({message: 'Product Created'});
        }
    });
}
module.exports = {getProducts, getProduct, createCategory, createProduct};
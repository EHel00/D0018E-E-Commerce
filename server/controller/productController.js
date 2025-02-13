

const db = require('../config/mySqlConfig.js');
const logger = require('../config/logger.js');
const query = require('../query/productQuery.js');


export const getProducts= async(req, res) => {
    logger.info('${req.method} ${req.originalUrl}, fetching products');
    await db.query(PQuery.getAllProducts, (error, results) => {
        if (!results) {
            res.status(404).send({message: 'Products not found'});

        } else {
        res.status(200).send(results,{message: 'Products found'});
    }
  });
};


export const getProduct= async(req, res) => {
    logger.info('${req.method} ${req.originalUrl}, fetching product');
    await db.query(PQuery.getProductById, (error, results) => {
        if (!results) {
            res.status(404).send({message: 'Product not found'});

        } else {
        res.status(200).send(results,{message: 'Product found'});
    }
  });
};
module.exports = {getProducts};
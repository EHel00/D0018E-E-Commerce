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
    logger.info(`${req.method} ${req.originalUrl}, creating Category`);
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
    logger.info(`${req.method} ${req.originalUrl}, creating Product`);
    db.query(QUERY.insertProduct, Object.values(req.body), (error, results) => { 
        if (!results) {
            logger.error(error.message);
            res.status(400).json({message: 'Error'});
        } else {
            res.status(201).json({message: 'Product Created'});
        }
    });
}

const getSupplyByProductId = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Supply`);
    db.query(QUERY.getSupplyByProductId, [req.params.id], (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            res.status(404).json({message: 'Supply not found'});
        } else {
            res.status(200).json({message: 'Supply found', data: results[0]});
        }
    });
}

const getAllSupply = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Supply`);
    db.query(QUERY.getAllSupply, (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(404).json({message: 'Supply not found'});
        } else {
            res.status(200).json({message: 'Supply found', data: results});
        }
    });
}

const increaseSupply = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, searching Supply`);
    db.query(QUERY.getSupplyByProductId, Object.values(req.body), (error, results) => {
        if (!results[0]) {
            logger.error(error.message);
            logger.info("inserting supply");
            db.query(QUERY.insertSupply, Object.values(req.body), (error, results) => { 
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(200).json({message: 'Supply Created', data: results});
                }
            });
        } else {
            logger.info("updating supply");
            db.query(QUERY.updateSupply, Object.values(req.body), (error, results) => { 
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(201).json({message: 'Supply Updated', data: results});
                }
            });
        }
    })
    
}
module.exports = {getProducts, getProduct, createCategory, createProduct, increaseSupply, getAllSupply, getSupplyByProductId};
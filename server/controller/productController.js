const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const { get } = require("http");


const getProducts = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching products`);
        db.query(QUERY.getAllProducts, (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Products not found'});
        } else {
            res.status(200).json({message: 'Products found', data: results});
    }
  });
};

const getProductsByCategory = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching products`);
        db.query(QUERY.getProductsByCategory, [req.params.id], (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Products not found'});
        } else {
            logger.info(results[0]);
            res.status(200).json({message: 'Products found', data: results});
    }
  });
}

const getProduct = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching product`);
        db.query(QUERY.getProductById, [req.params.id], (error, results) => {
        if (!results[0]) {
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

const getCategories = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Categorys`);
    db.query(QUERY.getAllCategories, (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Categorys not found'});
        } else {
            res.status(200).json({message: 'Categorys found', data: results});
        }
    });
}

const getCategory = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Category`);
    db.query(QUERY.getCategory, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(404).json({message: 'Category not found'});
        } else {
            res.status(200).json({message: 'Category found', data: results[0]});
        }
    });
}

const getProductsInCategory = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching products in category`);
    db.query(QUERY.getAllProductsInC, [req.params.id], (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Products not found'});
        } else {
            res.status(200).json({message: 'Products found', data: results});
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
            db.query(QUERY.insertSupply, [results.insertId, 0], (error, results) => {
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(201).json({message: 'Product Created'});
                }           
            })
            
        }
    });
}
const createProductID = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating Product`);
    db.query(QUERY.insertProduct, [req.params.id, req.body.Size, req.body.Price], (error, results) => { 
        if (!results) {
            logger.error(error.message);
            res.status(400).json({message: 'Error'});
        } else {
            db.query(QUERY.insertSupply, [results.insertId, 0], (error, results) => {
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(201).json({message: 'Product Created'});
                }           
            })
            
        }
    });
}

const getSupplyByProductId = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Supply`);
    db.query(QUERY.getSupplyByProductId, [req.params.id], (error, results) => {
        if (!results[0]) {
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
            res.status(404).json({message: 'Supply not found'});
        } else {
            res.status(200).json({message: 'Supply found', data: results});
        }
    });
}

// product, supply
const updateSupply = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, searching Supply`);
    const values = Object.values(req.body);
    // find if product is in supply
    db.query(QUERY.getSupplyByProductId, values, (error, results) => {
        if (!results[0]) {
            logger.info("inserting supply");
            // if not, insert
            db.query(QUERY.insertSupply, values, (error, results) => { 
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(200).json({message: 'Supply Created', data: results});
                }
            });
        } else {
            logger.info("updating supply");
            // if yes, update
            db.query(QUERY.updateSupply, [values[1], values[0]], (error, results) => { 
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

const buyOne = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, searching Supply`);
    db.query(QUERY.getSupplyByProductId, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(404).json({message: 'Supply not found'});
        } else {
            const quantity = results[0].Quantity;
            logger.info(quantity);
            if (quantity > 0) {
                db.query(QUERY.updateSupply, [quantity - 1, req.params.id], (error, results) => { 
                    if (!results) {
                        logger.error(error.message);
                        res.status(400).json({message: 'Error'});
                    } else {
                        res.status(201).json({message: 'Supply Updated', data: quantity - 1});
                    }
                });
            } else {
                res.status(400).json({message: 'Out of stock'});
            }
        }
    });
}

const addOne = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, searching Supply`);
    db.query(QUERY.getSupplyByProductId, [req.params.id], (error, results) => {
        if (!results[0]) {
            res.status(404).json({message: 'Supply not found'});
        } else {
            const quantity = results[0].Quantity;
            logger.info(quantity);
            db.query(QUERY.updateSupply, [quantity + 1, req.params.id], (error, results) => { 
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(201).json({message: 'Supply Updated', data: quantity + 1});
                }
            });
        }
    });
}

const addToCart = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, adding to cart`);
    db.query(QUERY.updateValueInCart, [req.body.Quantity, req.body.User, req.body.Product], (error, results) => {
        if (results.affectedRows === 0) {
            db.query(QUERY.addToCart, [req.body.User, req.body.Product, req.body.Quantity], (error, results) => {
                if (!results) {
                    logger.error(error.message);
                    res.status(400).json({message: 'Error'});
                } else {
                    res.status(200).json({message: 'Added to cart'});
                }
            })
        } else {
            res.status(201).json({message: 'Updated cart'});
        }
    })
}

const getCart = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching cart`);
    db.query(QUERY.findCartByUser, [req.body.User], (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Cart not found'});
        } else {
            res.status(200).json({message: 'Cart found', data: results});
        }
    });
}

const removeFromCart = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, removing from cart`);
    db.query(QUERY.removeFromCart, [req.body.User, req.body.Product], (error, results) => {
        if (results.affectedRows === 0) {
            res.status(404).json({message: 'Cart not found'});
        } else {
            res.status(200).json({message: 'Removed from cart'});
        }
    })
}

const checkOut = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, checking out`);
    db.query(QUERY.getCartByUser, [req.body.User], (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Cart not found'});
        } else {
            db.query(QUERY.checkOut, [req.body.User], (error, results) => {
                if (results.affectedRows === 0) {
                    res.status(404).json({message: 'Cart not found'});
                } else {
                    res.status(200).json({message: 'Checked out'});
                }
            })
        }
    })
}
// SELECT * FROM ShoppingCart JOIN Supply ON ShoppingCart.Product = Supply.Product WHERE ShoppingCart.User = '2';

module.exports = {
    getProducts, 
    getProduct, 
    createCategory, 
    createProduct, 
    updateSupply, 
    getAllSupply, 
    getSupplyByProductId, 
    buyOne, 
    addOne, 
    getCategories, 
    getCategory, 
    getProductsByCategory,
    getProductsInCategory,
    createProductID,
    addToCart,
    getCart,
    removeFromCart,
    checkOut,
};
const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const mysql = require("mysql2/promise");


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

const deleteProduct = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting product`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.deleteProduct, [req.params.id]);
        res.status(200).json({message: 'Product deleted'});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

const updateProduct = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating product`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.updateProduct, [req.body.Size, req.body.Price, req.params.id]);
        res.status(200).json({message: 'Product updated'});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

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

const deleteCategory = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting category`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.deleteProduct, [req.params.id]);
        res.status(200).json({message: 'Product deleted'});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

const getCategories = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching Categorys`);
    db.query(QUERY.getAllCategories, (error, results) => {
        if (!results) {
            res.status(404).json({message: 'Categories not found'});
        } else {
            res.status(200).json({message: 'Categories found', data: results});
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

const updateSupply = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating Supply`);
    let con;
    try {
        con = await db.promise().getConnection();
        const sup = await con.query(QUERY.getSupplyByProductId, [req.params.id]);

        const result = await con.query(QUERY.updateSupply, [sup[0][0].Quantity + req.body.Quantity, parseInt(req.params.id)]);

        res.status(200).json({message: 'Supply updated'});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: error.message});
    } finally {
        if (con) {
            await con.release();
        }
    }    
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

const addToCart = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, adding to cart`);
    let con;
    try {
        con = await db.promise().getConnection();
        await con.beginTransaction();
        logger.info(req.userId);
        const result = await con.query(QUERY.findCartByUser, [req.userId]);
        const data = result[0];
        if (data.length == 0) {
            await con.query(QUERY.addToCart, [req.userId, req.body.Product, req.body.Quantity]);
        } else {
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].Product == req.body.Product) {
                    const quant = data[i].Quantity + parseInt(req.body.Quantity);
                    await con.query(QUERY.updateValueInCart, [quant, req.userId, req.body.Product]);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                await con.query(QUERY.addToCart, [req.userId, req.body.Product, req.body.Quantity]);
            }
        }
        await con.commit();
        res.status(200).json({message: 'Added to cart'});
    } catch (error) {
        if(con){
        await con.rollback();
    }
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if(con) {
            await con.release();
        }
    }
}

const getCart = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching cart`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.fancyGetCart, [req.userId]);
        data = result[0];
        let price = [];
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += parseInt(data[i].Price) * parseInt(data[i].Amount);
            price.push(parseInt(data[i].Price)* data[i].Amount);
        }
        res.status(200).json({message: 'Cart found', data: result[0], total: total, price: price});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if(con) {
            await con.release();
        }
    }
}

const removeFromCart = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, removing from cart`);
    let con;
    logger.info(req.body.Product)
    try {
        con = await db.promise().getConnection();
        await con.query(QUERY.removeFromCart, [req.userId, req.body.Product])
        res.status(200).json({message: 'product removed' })

    }catch (error) {
        logger.error(error);
        res.status(400).json({message: 'Error'});
    }
    finally{
        if(con){
            await con.release();
        }
    }
}


const checkOut = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, checking out`);
    let con;
    try {
        // grab connection
        con = await db.promise().getConnection();
        // grab cart and supply
        const results = await con.query(QUERY.getCartAndSupply, [req.userId]);
        const data = results[0];
        if (data.length === 0) {
            throw new Error('Cart is empty');
        }
        // start of transaction
        await con.beginTransaction();
        // create order history
        const result = await con.query(QUERY.createOrderHistory, [req.userId, new Date(), "Pending"]);
        const OrderHistory = result[0].insertId;
        const prod = [];
        const quant = [];
        // loop over cart
        for (let i = 0; i < data.length; i++) {
            // check if there is enough supply
            if (data[i].SupplyQuantity - data[i].CartQuantity < 0) {
                throw new Error(`${data[i].Product}`);
            }
            // save info
            prod.push(data[i].Product);
            quant.push(data[i].CartQuantity);
            // update supply
            await con.query(QUERY.updateSupply, [data[i].SupplyQuantity - data[i].CartQuantity, data[i].Product]);
            // add to order table
            await con.query(QUERY.addOrder, [OrderHistory, data[i].CartQuantity, data[i].Description, data[i].Size, data[i].Price]);
            // remove from cart
            await con.query(QUERY.removeFromCart, [req.userId, data[i].Product]);
        }
        let total = await priceCalculator(prod, quant);
        await con.query(QUERY.updateOrderHistoryTotal, [total, OrderHistory]);
        await con.commit();
        res.status(200).json({message: 'Checked out', data: results[0]});
    } catch (error) {
        if (con) {
            await con.rollback();
        }
        logger.error(error.message);
        res.status(400).json({message: error.message});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

// takes arrays of productId and Quantity
const priceCalculator = async(products, quantities) => {
    logger.info(`calculating price`);
    let con;
    try {
        let total = 0;
        // grab connection
        con = await db.promise().getConnection();
        for (let i = 0; i < products.length; i++) {
            const result = await con.query(QUERY.getProductPrice, products[i]);
            const price = result[0];
            total += price[0].Price * quantities[i];
        }
        return total;
    } catch (error) {
        logger.error(error.message);
    } finally {
        if (con) {
            await con.release();
        }
    }
}


const addGrade = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, adding review`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.addGrade, [req.userId, req.params.id, req.body.Grade, req.body.Comment]);
        res.status(200).json({message: 'Review added'});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

const getGrades = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, getting reviews`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.getGrades, [req.params.id]);
        res.status(200).json({message: 'Reviews found', data: result[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: 'Error'});
    } finally {
        if (con) {
            await con.release();
        }
    }
}


module.exports = {
    getProducts, 
    getProduct, 
    createCategory,  
    updateSupply, 
    getAllSupply, 
    getSupplyByProductId, 
    buyOne, 
    addOne, 
    getCategories, 
    getCategory, 
    getProductsInCategory,
    createProductID,
    updateProduct,
    addToCart,
    getCart,
    removeFromCart,
    checkOut,
    addGrade,
    getGrades,
    deleteCategory,
    deleteProduct
};
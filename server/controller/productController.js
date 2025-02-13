const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const query = require("../query/productQuery");


const getProducts= (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching products`);
        db.query(query.getAllProducts, (error, results) => {
        if (!results) {
            logger.error(error.message);
            res.status(404).json({message: 'Products not found'});
        } else {
            res.status(200).json({message: 'Products found', data: results});
    }
  });
};


// const getProduct= (req, res) => {
//     logger.info('${req.method} ${req.originalUrl}, fetching product');
//         db.query(query.getProductById, (error, results) => {
//         if (!results) {
//             res.status(404).send({message: 'Product not found'});

//         } else {
//         res.status(200).send(results,{message: 'Product found'});
//     }
//   });
// };
module.exports = getProducts;
const express = require("express");
const {
    getProducts, 
    getProduct,
    createCategory,
    createProduct
}
= require("../controller/productController");

const router = express.Router();


router.get("/getProducts", getProducts);

router.get("/getProduct/:id", getProduct);

router.post("/createCategory", createCategory);
router.post("/createProduct", createProduct);

module.exports = router;
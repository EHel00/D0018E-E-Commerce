const express = require("express");
const {
    getProducts, 
    getProduct,
    createCategory,
    createProduct,
    increaseSupply,
    getAllSupply,
    getSupplyByProductId
}
= require("../controller/productController");

const router = express.Router();

// product
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);

// supply
router.post("/increaseSupply", increaseSupply);

router.get("/getAllSupply", getAllSupply);
router.get("/getSupplyByProductId/:id", getSupplyByProductId);


// category
router.post("/createCategory", createCategory);
router.post("/createProduct", createProduct);

module.exports = router;
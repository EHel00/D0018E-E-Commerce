const express = require("express");
const {
    getProducts, 
    getProduct,
    createCategory,
    createProduct,
    updateSupply,
    getAllSupply,
    getSupplyByProductId,
    buyOne,
    addOne
}
= require("../controller/productController");

const router = express.Router();

// product
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);

// supply
router.post("/updateSupply", updateSupply);

router.get("/getAllSupply", getAllSupply);
router.get("/getSupplyByProductId/:id", getSupplyByProductId);

router.put("/buyOne/:id", buyOne);
router.put("/addOne/:id", addOne);

// category
router.post("/createCategory", createCategory);
router.post("/createProduct", createProduct);

module.exports = router;
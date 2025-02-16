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
    addOne,
    getCategory,
    getCategories
}
= require("../controller/productController");

const router = express.Router();

// product
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);

router.post("/createProduct", createProduct);
// supply
router.post("/updateSupply", updateSupply);

router.get("/getAllSupply", getAllSupply);
router.get("/getSupplyByProductId/:id", getSupplyByProductId);

router.put("/buyOne/:id", buyOne);
router.put("/addOne/:id", addOne);

// category
router.get("/getCategory/:id", getCategory);
router.get("/getCategories", getCategories);

router.post("/createCategory", createCategory);


module.exports = router;
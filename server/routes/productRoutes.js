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
    getCategories,
    getProductsByCategory,
    getProductsInCategory,
    createProductID,
    addToCart,
    getCart,
    removeFromCart,
    checkOut,
}
= require("../controller/productController");

const router = express.Router();

// product
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.get("/getProductsByCategory/:id", getProductsByCategory);
router.post("/createProduct", createProduct);
router.post("/createProduct/:id", createProductID);
// supply
router.post("/updateSupply", updateSupply);

router.get("/getAllSupply", getAllSupply);
router.get("/getSupplyByProductId/:id", getSupplyByProductId);

router.put("/buyOne/:id", buyOne);
router.put("/addOne/:id", addOne);

// category
router.get("/getCategory/:id", getCategory);
router.get("/getCategories", getCategories);
router.get("/getProductsInCategory/:id", getProductsInCategory);

router.post("/createCategory", createCategory);


// shopping cart
router.post("/addToCart/:id", addToCart);
router.get("/getCart", getCart);
router.put("/removeFromCart", removeFromCart);
router.post("/checkOut", checkOut);

module.exports = router;
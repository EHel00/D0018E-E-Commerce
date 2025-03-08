const express = require("express");
const {
    getProducts, 
    getProduct,
    createCategory,
    updateSupply,
    getAllSupply,
    getSupplyByProductId,
    buyOne,
    addOne,
    getCategory,
    getCategories,
    getProductsInCategory,
    createProductID,
    updateProduct,
    addToCart,
    getCart,
    removeFromCart,
    checkOut,
    addGrade,
    getGrades,
}
= require("../controller/productController");
const validateToken = require("../utility/validateToken");
const authenticate = require("../utility/authenticate");

const router = express.Router();

// product
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.post("/createProduct/:id", validateToken, authenticate, createProductID);
router.put("/updateProduct/:id", validateToken, authenticate, updateProduct);
// supply
router.post("/updateSupply/:id", validateToken, authenticate, updateSupply);

router.get("/getAllSupply", getAllSupply);
router.get("/getSupplyByProductId/:id", getSupplyByProductId);

router.put("/buyOne/:id", buyOne);
router.put("/addOne/:id", validateToken, authenticate, addOne);

// category
router.get("/getCategory/:id", getCategory);
router.get("/getCategories", getCategories);
router.get("/getProductsInCategory/:id", getProductsInCategory);

router.post("/createCategory", validateToken, authenticate, createCategory);


// shopping cart
router.post("/addToCart", validateToken, addToCart);
router.get("/getCart", validateToken, getCart);

router.put("/removeFromCart", validateToken, removeFromCart);
router.post("/checkOut", validateToken, checkOut);


// grade
router.post("/addReview/:id", validateToken, addGrade);
router.get("/getReviews/:id", getGrades);
module.exports = router;
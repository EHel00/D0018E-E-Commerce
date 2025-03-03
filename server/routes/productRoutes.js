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
    addGrade,
    getGrades,
}
= require("../controller/productController");
const validateToken = require("../utility/validateToken");

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
router.post("/addToCart", validateToken, addToCart);
router.get("/getCart", validateToken, getCart);

router.put("/removeFromCart", validateToken, removeFromCart);
router.post("/checkOut", validateToken, checkOut);


// grade
router.post("/addReview/:id", validateToken, addGrade);
router.get("/getReviews/:id", getGrades);
module.exports = router;
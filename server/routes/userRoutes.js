const express = require("express");
const validateToken = require("../utility/validateToken");
const {
    getUsers,
    createUser,
    getUser,
    login,
    logout,
    createAdmin,
    getOrderHistoryCustomer,
    getOrderHistoryAdmin,
    getOrderDetails,
    updateOrderStatus,
    updateUser,

} = require("../controller/userController");
const authenticate = require("../utility/authenticate");

const router = express.Router();


router.get("/getUsers", validateToken, getUsers);

router.post("/createUser", createUser);
router.put("/updateUser", validateToken, updateUser);
router.get("/getUser", validateToken, getUser);
router.get("/getOrderHistoryCustomer", validateToken, getOrderHistoryCustomer);


router.post("/createAdmin", validateToken, authenticate, createAdmin);
router.get("/getOrderHistoryAdmin", validateToken, authenticate, getOrderHistoryAdmin);
router.get("/getOrderDetails", validateToken, authenticate, getOrderDetails);
router.put("/updateOrderStatus", validateToken, authenticate, updateOrderStatus);

router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
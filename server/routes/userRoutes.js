const express = require("express");
const validateToken = require("../utility/validateToken");
const {
    getUsers,
    createUser,
    getUser,
    login,
    logout,
    createAdmin,
} = require("../controller/userController");

const router = express.Router();


router.get("/getUsers", validateToken, getUsers);

router.post("/createUser", createUser);
router.get("/getUser", validateToken, getUser);

router.post("/createAdmin", createAdmin);

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
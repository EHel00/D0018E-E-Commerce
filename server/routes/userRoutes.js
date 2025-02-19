const express = require("express");
const {
    getUsers,
    createUser,
    getUser,
    login,
} = require("../controller/userController");

const router = express.Router();


router.get("/getUsers", getUsers);

router.post("/createUser", createUser);
router.get("/getUser/:id", getUser);

router.post("/login", login);
module.exports = router;
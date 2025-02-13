const express = require("express");
const {
    getUsers,
    createUser,
} = require("../controller/userController");

const router = express.Router();


router.get("/getUsers", getUsers);
router.post("/createUser", createUser);


module.exports = router;
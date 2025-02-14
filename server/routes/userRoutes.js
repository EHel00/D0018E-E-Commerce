const express = require("express");
const {
    getUsers,
    createUser,
    getUser,
} = require("../controller/userController");

const router = express.Router();


router.get("/getUsers", getUsers);

router.post("/createUser", createUser);
router.get("/getUser/:id", getUser);

module.exports = router;
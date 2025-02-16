const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  };


const getUsers = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    db.query(QUERY.selectUser, (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(200).json({message: "No users found"});
        } else {
            res.status(200).json({message: "Users found", data: results});
        }
        
    });
};

const createUser = (req,res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    db.query(QUERY.createUser, Object.values(req.body), (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(400).json({message: "Error"});
        } else {
            // db.query(QUERY.createShoppingCart, [results.insertId, null], (error, results) => {
            //     if(!results) {
            //         logger.error(error.message);
            //         res.status(400).json({message: "Error"});
            //     }
            // })
            res.status(201).json({message: "Created"});
        }
    });
}

const getUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    db.query(QUERY.selectUserById, [req.params.id], (error, results) => {
        if(!results[0]) {
            logger.error(error.message);
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json({message: "User found", data: results[0]});
        }
    });
}

const login = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, logging in user`);

};
module.exports = {getUsers, createUser, getUser};
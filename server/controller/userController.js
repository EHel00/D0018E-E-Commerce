const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/userQuery");

const getUsers = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    db.query(QUERY.SELECT_USERS, (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(200).json({message: "No users found"});
        } else {
            res.status(200).json({message: "Users found", data: results});
        }
        
    });
};

const createUser = async(req,res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    db.query(QUERY.CREATE_USER, Object.values(req.body), (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(400).json({message: "Error"});
        } else {
            res.status(201).json({message: "Created"});
        }
    });
}

const getUser = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    db.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
        if(!results[0]) {
            logger.error(error.message);
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json({message: "User found", data: results[0]});
        }
    });
}
module.exports = {getUsers, createUser, getUser};
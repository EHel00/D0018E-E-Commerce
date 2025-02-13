const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/userQuery");

const getUsers = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    db.query(QUERY.SELECT_USERS, (error, results => {
        if(!results) {
            logger.error(error.message);
            res.status(404).send({message: "No users found"});
        } else {
            res.status(200).send({message: "Users found"}, results);
        }
        
    }))
};

const createUser = async(req,res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    db.query(QUERY.CREATE_USER, (error, results => {
        if(!results) {
            logger.error(error.message);
            res.status(400).send({message: "Error"});
        } else {
            res.status(201).send({message: "Created"});
        }
    }))
}
module.exports = {getUsers, createUser};
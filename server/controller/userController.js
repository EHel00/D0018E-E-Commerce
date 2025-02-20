const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
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
    const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
    req.body.Password = hashedPassword;
    db.query(QUERY.createUser, Object.values(req.body), (error, results) => {
        if(!results) {
            logger.error(error.message);
            res.status(400).json({message: "Error"});
        } else {
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
    db.query(QUERY.selectUserByEmail, [req.body.email], async(error, results) => {
        if(!results[0]) {
            res.status(404).json({message: "User not found3"});
        } else {
            logger.info(results[0].Password);
            logger.info(req.body.password);
            if(await bcrypt.compare(req.body.password, results[0].Password)) {
                logger.info(req.body.email);
                const token = generateAccessToken(results[0].idUser);
                res.status(200).json({message: "User logged in", token: token});
            } else {
                res.status(401).json({message: "Invalid password"});
            }
        }
    });

};
module.exports = {getUsers, createUser, getUser, login};
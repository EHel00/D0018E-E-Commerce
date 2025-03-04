const db = require("../config/mysqlConfig");
const QUERY = require("../query/query");
const mysql = require("mysql2/promise");
const logger = require("./logger");

const authenticate = async(req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}, authenticating user`);
    let con;
    try {
        con = await db.promise().getConnection();
        const result = await con.query(QUERY.selectRoleByUser, [req.userId]);
        const role = result[0][0].Role;
        if (role === "admin") {
            next();
        } else {
            throw new Error("Unauthorized");
        }
    } catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: error.message });
    } finally {
        if (con) {
            await con.release();
        }
    }
};

module.exports = authenticate;
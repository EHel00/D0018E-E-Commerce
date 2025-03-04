const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");


const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
  };
//   const generateRefreshToken = (userId) => {
//     return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
//   };


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

const createUser = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating user`);
    let con;
    try {
        con = await db.promise().getConnection();
        await con.beginTransaction();
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
        req.body.Password = hashedPassword;
        const result = await con.query(QUERY.createUser, Object.values(req.body));
        const userId = result[0].insertId;
        const roleResult = await con.query(QUERY.insertRole, [userId, "customer"]);
        await con.commit();
        res.status(200).json({message: "User created", data: result[0]});
    } catch (error) {
        if (con) {
            await con.rollback();
        }
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

const getUser = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching user`);
    logger.info(req.userId)
    db.query(QUERY.selectUserById, [req.userId], (error, results) => {
        if(!results[0]) {
            
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json({message: "User found", data: results[0]});
        }
    });
}

const updateUser = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating user`);
    try {
        const result = await db.promise().query(QUERY.updateUser, [req.body.Password, req.body.PhoneNumber, req.body.FirstName, req.body.LastName, req.body.Address, req.userId]);
        res.status(200).json({message: "User updated", data: result[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    }

}

const login = async(req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, logging in user`);
    let con;
    try {
        con = await db.promise().getConnection();
        result = await con.query(QUERY.selectUserByEmail, [req.body.email]);
        if(!result[0][0]) {    
            throw new Error("User not found");
        }
        if(await bcrypt.compare(req.body.password, result[0][0].Password)) {
            logger.info(req.body.email);
            const accessToken = generateAccessToken(result[0][0].idUser);
            //const refreshToken = generateRefreshToken(results[0].idUser)
            // res.cookie('jwt', refreshToken, { domain: 'localhost', path: '/', httpOnly:true, secure:true, sameSite: 'strict',
            //     maxAge:7*24*60*60*1000
            // });
            role = await con.query(QUERY.selectRoleByUser, [result[0][0].idUser]);
            res.status(200).json({message: "User logged in", accessToken: accessToken, role: role[0][0].Role});
        } else {
            throw new Error("Invalid password");
        }
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: error.message});
    } finally {
        if (con) {
            await con.release();
        }
    }
};

const createAdmin = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating admin`);
    let con;
    try {
        con = await db.promise().getConnection();
        await con.beginTransaction();
        const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
        req.body.Password = hashedPassword;
        const result = await con.query(QUERY.createUser, Object.values(req.body));
        const userId = result[0].insertId;
        const roleResult = await con.query(QUERY.insertRole, [userId, "admin"]);
        await con.commit();
        res.status(200).json({message: "Admin created", data: result[0]});
    } catch (error) {
        if (con) {
            await con.rollback();
        }
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    } finally {
        if (con) {
            await con.release();
        }
    }
}

const getOrderHistoryCustomer = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching order history`);
    try {
        const result = await db.promise().query(QUERY.getOrderHistoryByUser, [req.userId]);
        logger.info(result[0]);
        const result2 = await db.promise().query(QUERY.getOrder, [result[0][0].idOrderHistory]);
        res.status(200).json({message: "Order history found", OrderHistory: result[0][0], Order: result2[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    }
}

const getOrderHistoryAdmin = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching order history`);
    try {
        const result = await db.promise().query(QUERY.getOrderHistory);
        res.status(200).json({message: "Order history found", data: result[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    }
}

const getOrderDetails = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching order details`);
    try {
        const result = await db.promise().query(QUERY.getOrder, [req.body.idOrderHistory]);
        res.status(200).json({message: "Order details found", data: result[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    }
}

const updateOrderStatus = async (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating order status`);
    try {
        const result = await db.promise().query(QUERY.updateOrderHistoryStatus, ["Sent", req.body.idOrderHistory]);
        res.status(200).json({message: "Order status updated", data: result[0]});
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({message: "Error"});
    }
}
// const refreshToken = asyncHandler(async (req,res) => {
//     if (req.cookies?.jwt) { // If the cookie is not present it will return undefined/null
//         // Getting refreshToken from cookie
//         const refreshToken = req.cookies.jwt;
//         // Verify the refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
//             (err, decoded) => {
//                 if (err) {
//                     // Wrong Refesh Token
//                     return res.status(406).json({ message: 'Unauthorized' });
//                 }
//                 else {
//                     // Correct refresh token so we create a new access token
//                     generateAccessToken()

//                     return res.status(200).json({ accessToken });
//                 }
//             })
//     } else { // If the cookie is not present
//         return res.status(406).json({ message: 'Unauthorized -> Redirect to login' });
//     }
// } )

const logout = (async(req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({message: "You're logged out"});
});

module.exports = {getUsers, createUser, getUser, login, logout, createAdmin, getOrderHistoryCustomer, getOrderHistoryAdmin, getOrderDetails, updateOrderStatus};
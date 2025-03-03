const db = require("../config/mysqlConfig");
const logger = require("../utility/logger");
const QUERY = require("../query/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
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
    logger.info(req.userId)
    db.query(QUERY.selectUserById, [req.userId], (error, results) => {
        if(!results[0]) {
            
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
                const accessToken = generateAccessToken(results[0].idUser);
                //const refreshToken = generateRefreshToken(results[0].idUser)
                // res.cookie('jwt', refreshToken, { domain: 'localhost', path: '/', httpOnly:true, secure:true, sameSite: 'strict',
                //     maxAge:7*24*60*60*1000
                // })
                res.status(200).json({message: "User logged in", accessToken: accessToken});
            } else {
                res.status(401).json({message: "Invalid password"});
            }
        }
    });

};

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
module.exports = {getUsers, createUser, getUser, login, logout};
const jwt = require("jsonwebtoken");


// source https://www.youtube.com/watch?v=H9M02of22z4
const validateToken = async(req, res, next) => {
   
    let token;
    let authHeader =  req.headers.Authorization || req.headers.authorization;  
    if(authHeader && authHeader.startsWith("Bearer")) { // The Authorization header starts with "Bearer"
        token = authHeader.split(" ")[1]; // The token is the second part of the header
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not Authorized!")
            }
            req.user = decoded.user;       
            next();
        }); 
    } else{ // If there is no token
        res.status(401);
        throw new Error("Missing token")
    }
};

module.exports = validateToken;
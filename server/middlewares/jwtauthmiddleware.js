// initializing jsonwebtoken module to use functionalities of JWT e.g., sign, verify.verify

const jwt = require("jsonwebtoken");
// after successful register of user and then calling the login endpoint with the user details in the request body, we can generate a JWT token and store it in the database

const generateJwtToken = (userData) => {
    return jwt.sign({ userData }, process.env.PRIVATE_KEY, {
        expiresIn: "400000",
    });
};
// after login, we are gettint  a JWT token and for validating the jwt token we use jwt token, that it is correct or not, we will proceed with secure routes, to get/post/put/delete data from the database

const validateJwtToken = (req, res, next) => {
    // we check if the token is present in the request header
    const authCheck = req.headers.authorization;

    if (!authCheck) {
        return res.status(401).json({ error: "Token is missing" });
    }
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.userData = decoded.userData;
        next();
    });
};

module.exports = { jwtAuthMiddleware: generateJwtToken,validateJwtToken };

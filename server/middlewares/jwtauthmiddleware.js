// first we are initilizing jsonwebtoke module to use functionaliteis of jwt eg sign . verify
const jwt = require('jsonwebtoken');
// after sucressful registration of user and then calling the login endpoint 
// with the already register user , it will create and retuern JWT token
const generateJwtToken =(userData)=>{
    return jwt.sign(userData,process.env.PRIVATE_KEY,{expiresIn:4000000000})
}
// after login , we are getting the token , and for validation the jwt token that it is coorect
//  or not we will proceed with secure routes , to get/post/update/delete
const validateJwtToken = (req , res , next)=>{
    //  we are checking that token is avaiable or not in Request headers
    const tokenCheck = req.headers.authorization;
    //  OPTION 1: req header token , authorization not send.(doesnt exists)
    if (!tokenCheck) return res.status(401).json({err : 'Token not avaiable'});
    // OPTION 2 : req header token getting but not in a right format:
    // authorization BASIC / BEARER
    // BASIC btos(USERNAME:PASSWORD) -> BASIC kjdfnkjds
    //  BEARER nbsdkjvndskfvkdnf

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({err:'Invalid token'});
    }
    try{
        const validateToken = jwt.verify(token ,process.env.PRIVATE_KEY);
        req.user = validateToken;
        next();
    }catch(err){
        return res.status(401).json(err.message);
    }
    
}

module.exports = {generateJwtToken,validateJwtToken}
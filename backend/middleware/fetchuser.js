const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "Abhikis#goodboy";

const fetchuser = (req, res, next)=>{
    // Get user from JWTToken and add  ID to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({ error:"Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }
    catch(err){
        res.status(401).send({ error:"Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
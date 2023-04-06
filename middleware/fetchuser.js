var jwt = require("jsonwebtoken");
const JWT_SECRET = "hi$hi";

// middleware takes req , res , next
const fetchuser = (req, res, next) => {
    // Get the user from JWT token and id to req object
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error : "token not found Please authenticate using a valid token..."});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
    
        
        // next calls the next async function...
        next()
    } catch(error) {
        res.status(401).send({ error : "Please authenticate using a valid token..."});

    }
}
module.exports = fetchuser;
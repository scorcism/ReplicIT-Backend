// fetch user form the auth token
const jwt  = require('jsonwebtoken')
const JWT_SECRET = "supermanbatmansinchan"

const fetchUser = (req,res,next)=>{
    const token = req.header("auth-token");
    // // console.log(token)
    if(!token){
        // console.log("1")
        res.status(401).json({error: "Authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next()
    }  catch (error) {
        // console.log("fetchUser: " + error)
        res.status(401).json({ error: "Authenticate using valid token" });
    }
}



module.exports = fetchUser;


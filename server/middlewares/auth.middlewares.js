const jwt=require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(201).json({message: "Unauthorised"});
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    catch (e) {
        res.status(403).json({message: "Token Not valid Login Again"})
    }

}

module.exports=authenticateToken
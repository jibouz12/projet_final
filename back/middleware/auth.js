const jwt = require("jsonwebtoken");
require("dotenv").config();

/////////////////////
/// récupérer Token sans le "bearer"
/// vérifier et décoder le Token
/// récupérer userId et admin
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  
        const decodedToken = jwt.verify(token, "" + process.env.CLE_TOKEN);
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        req.auth = {
            userId: userId,
            admin: admin
        };
	    next();
    } catch(error) {
        res.status(401).json({ error });
    }
};
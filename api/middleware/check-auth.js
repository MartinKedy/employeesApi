const jwt = require('jsonwebtoken');
const dbConfig = require('../../config/mongoConfig');

module.exports = (req, res ,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, dbConfig.JWT_KEY);
        next();

    } catch(err) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
};
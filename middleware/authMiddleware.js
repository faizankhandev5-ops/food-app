const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided or invalid format",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized, token failed",
                });
            } else {
                req.user = decode; // store decoded info (like id) here
                next();
            }
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Not authorized, token failed",
        });
    }
};

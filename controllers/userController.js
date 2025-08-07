const User = require("../models/userModel");

const getUser = async (req, res) => {
    try {
        console.log(req.user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getUser,
    
};

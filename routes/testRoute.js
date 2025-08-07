const express = require("express");
const { userTestController } = require("../controllers/testController");
const router = express.Router();

router.get("/test-user", userTestController); // test user route


module.exports = router;

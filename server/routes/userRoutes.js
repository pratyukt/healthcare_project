const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const {jwtAuthMiddleware} = require("../middlewares/jwtAuthMiddleware");
// import {jwtAuthMiddleware} from "../middlewares/jwtAuthMiddleware";
// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login",jwtAuthMiddleware ,loginUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const { registerDoctor } = require("../controllers/doctorDetailsController");
const {jwtAuthMiddleware} = require("../middlewares/jwtAuthMiddleware");
//Doctor registration route
router.post("/register",jwtAuthMiddleware , registerDoctor);

module.exports = router;

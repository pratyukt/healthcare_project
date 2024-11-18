const express = require("express");
const router = express.Router();
const { publicnewsLetter } = require("../controllers/newsLetterController");
// const { route } = require("./doctorDetailsRoutes");
// const { model } = require("mongoose");


router.post("/NewsLetter", publicnewsLetter);

module.exports = router;
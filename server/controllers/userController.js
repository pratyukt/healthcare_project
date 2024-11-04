const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
require("dotenv").config();


const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password, age, phoneNumber, gender, bloodGroup,} = req.body;

    // Check if the fields are provided
    if(!name || !email || !password || !age || !phoneNumber|| !gender || !bloodGroup){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists){
        return res.status(400).json({ message: "User already Exists"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        bloodGroup,
        phoneNumber
    });

    res.status(201).json({ message: "User registered successfully", user});

})
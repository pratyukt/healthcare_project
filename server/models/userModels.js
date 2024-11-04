const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true,"Enter your name"],
        },
        email: {
            type: String,
            require: [true,"Enter your email"],
        },
        password: {
            type: String,
            require: [true,"Enter your password"],
        },
        age: {
            type: int,
            require: [true,"Enter your name"],
        },
        phoneNumber: {
            type: String,
            require: [true,"Enter your name"],
        },
        gender: {
            type: String,
            require: [true,"Enter your name"],
        },
        bloodGroup: {
            type: String,
            require: [true,"Enter your name"],
        },
    },
    {}
)
const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Your Title"],
    },
    author:{
        type: String,
        required: [true, "Enter Author name"],
    },
    date:{
        type: Date,
        required: [true, "Date"],
    },
    description: {
        type: String,
        required: [true,"Description of NewsLetter"]
    },
    imageurl: {
        type: String,
        required: [true,"Image URL"]
    }
})

module.exports = mongoose.model("NewsLetter", newsSchema);
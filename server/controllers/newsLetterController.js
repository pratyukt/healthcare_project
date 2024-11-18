const asyncHandler = require("express-async-handler");
const NewsLetter = require("../models/newsLetterModel");
require('dotenv').config();


const publicnewsLetter = asyncHandler(async (req, res) => {
    const { title, author, date, description, imageurl } = req.body

    if (!title || !author || !date || !description || !imageurl) {
        res.status(400);
        throw new Error("Enter all Fields");
    }

    const newLetter = await NewsLetter.create({
        title,
        author,
        date,
        description,
        imageurl,
    });

    if (newLetter) {
        res.status(201).json({
            title: NewsLetter.title,
            author: NewsLetter.author,
            date: NewsLetter.date,
            description: NewsLetter.description,
            imageurl: NewsLetter.imageurl,
        })
    }else{
        res.status(400);
        throw new Error("Invalid data");
    }
})

module.exports = {publicnewsLetter};
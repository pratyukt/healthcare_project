const express= require("express");
const connectDb= require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors= require ("cors");
const path = require("path");
const hbs = require("hbs");

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port= process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
//Route for user registration and authentication
app.use("/api/register", require("./routes/userRoutes"));

//Error handling
app.use(errorHandler);

//Routes below
app.get("/",(req,res)=>{
    res.send("working")
});

app.set('view engine' , 'hbs');

app.get("/home",(req,res)=>{
    res.render("home",{
        users: [
            { username: "aaa", date: "23-10-2024", subject: "Maths" },
            { username: "bbb", date: "23-10-2014", subject: "Science" },
            { username: "ccc", date: "23-10-2004", subject: "Hindi" }
        ]
    })
})

hbs.registerPartials(path.join(__dirname, '/views/partials/'));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
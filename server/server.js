const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv")
const multer = require("multer")

dotenv.config();

// Database connection
connectDb();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    }
});
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handlebars view engine setup
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Setting up multer storage with proper file extension handling


// Routes
const doctorRoutes = require("./routes/doctorDetailsRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Basic Routes
app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/home", (req, res) => {
    res.render("home", { 
        username: "aaa",
        age: 20,
    });
});

app.get("/user", (req, res) => {
    const users = [
        { username: "aaa", age: 20 },
        { username: "bbb", age: 22 },
        { username: "ccc", age: 21 }
    ];
    res.render("user", { users });
});

// Route to handle file upload and respond with file URL

app.post("/profile", upload.single("avatar"), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.body);
    console.log(req.file);

    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    return res.render("home", {
        imageUrl: imageUrl 
    });
});


// Server Listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

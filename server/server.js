const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
dotenv.config();

// Database connection
connectDb();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware setup
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Static middleware to serve images

// Handlebars view engine setup
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

const doctorRoutes = require("./routes/doctorDetailsRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler); // Error handling middleware

let imageUrls = [];
// Basic Routes
app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/home", (req, res) => {
    res.render("home", { 
        username: "Raghav",
        age: 20,
    });
});

app.get("/user", (req, res) => {
    const users = [
        { username: "rajesh", age: 20 },
        { username: "Acz", age: 20 },
        { username: "Cvd", age: 20 }
    ];
    res.render("user", { users });
});

app.post("/profile", upload.single("avatar"), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log(req.body);
    console.log(req.file);

    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    imageUrls.push(imageUrl);
    return res.render("gallery", {
        imageUrls: imageUrls
    });
});

app.get("/gallery", (req, res) => {
    const imageUrls = []; 
    res.render("images", { imageUrls: imageUrls }); 
});

app.get('/gallery', (req, res) => {
    const imageFolderPath = path.join(__dirname, 'uploads');
    
    // Read files from the uploads folder
    fs.readdir(imageFolderPath, (err, files) => {
        if (err) {
            console.error("Error reading files:", err);
            res.status(500).send("Error retrieving images");
            return;
        }
        
        // Filter for only image files
        const images = files.map(file => `/uploads/${file}`);
        
        // Render the gallery view with the images array
        res.render('gallery', { images });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json()); // JSON middleware - it fullfils req.body with JS object

// Registration and Login ROUTES/Endpoints
// importing user context
const User = require("./model/user");

// to test if server is runnig, port is OK
app.get("/", (req, res) => {
    res.status(200).send("OK");
});

// Register - URL: http://localhost:3000/register
app.post("/register", (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
});

// Login
app.post("/login", (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
});

module.exports = app;




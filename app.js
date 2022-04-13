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
// {"first_name": "Waltz", "last_name": "Udo", "email": "waltz@info.com", "password": "mypassword"}
    
app.post("/register", (req, res) => {
    try {
        // throw new Error('Fityiszt neked');
        // Get user input    
        const { first_name, last_name, email, password } = req.body;
        console.log(first_name, last_name, email, password);
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        } else {
            res.status(200).send("OK");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

// Login
app.post("/login", (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
});

module.exports = app;




require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("./config/database").connect();
const auth = require("./middleware/auth");
const express = require("express");
const app = express();

app.use(express.json()); // JSON middleware - it fullfils req.body with JS object
app.use((req, res, next) => {
    console.log("Uzi jott");
    next();
});

// Registration and Login ROUTES/Endpoints
// importing user context
const User = require("./model/user");

// to test if server is runnig, port is OK
app.get("/", (req, res) => {
    res.status(200).send("OK");
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

// Register - URL: http://localhost:3000/register
// { "first_name": "Waltz", "last_name": "Udo", "email": "waltz@info.com", "password": "mypassword" }
    
app.post("/register", async (req, res) => {
    try {
        // throw new Error('Fityiszt neked');
        // Get user input    
        const { first_name, last_name, email, password } = req.body;
        console.log(first_name, last_name, email, password);
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        } 
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });  

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "10s" }   
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user); // 201 Created
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

// Login - URL: http://localhost:3000/login
// { "email": "waltz@info.com", "password": "mypassword" }
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            // save user token
            user.token = token;
            // user
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

});

module.exports = app;




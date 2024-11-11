const express = require('express');
require('dotenv').config();
const db = require('./config/mongooseConfig');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.PORT || 3000;
const app = express();
const userModel = require('./models/userModel');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: process.env.EXPRESS_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// Set EJS as template engine
app.set('view engine', 'ejs');

// Routes for backend logic
app.get('/', (req, res) => {
    let user;
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY); // Verify the token
        } catch (err) {
            user = { email: "", username: "" };
        }
    } else {
        user = { email: "", username: "" };
    }
    console.log(user);
    res.render('index', { user });
    req.flash("error", "");
});

// Handle login
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_KEY);
                res.cookie("token", token, { httpOnly: true }); // Set token as HttpOnly for security
                res.redirect('/');
            } else {
                req.flash("error", "Invalid email or password");
                res.redirect('/login');
            }
        });
    } else {
        req.flash("error", "Invalid email or password");
        res.redirect('/login');
    }
});

// Handle user creation
app.post('/create', async (req, res) => {
    let { name, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.log(err);
                return;
            }
            let user = await userModel.findOne({ email: email });
            if (!user) {
                let newUser = await userModel.create({
                    username: name,
                    email,
                    password: hash
                });
                req.flash("error", "User Created");
                let token = jwt.sign({ email: newUser.email, username: newUser.username }, process.env.JWT_KEY);
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/');
            } else {
                req.flash("error", "Email already exists");
                res.redirect('/login');
            }
        });
    });
});

// Login page
app.get('/login', (req, res) => {
    let user;
    let err = req.flash('error');
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        } catch (err) {
            user = { email: "", username: "" };
        }
    } else {
        user = { email: "", username: "" };
    }
    res.render('login', { user, err });
});

// Other routes (booking, about, etc.)
app.get('/booking', (req, res) => {
    let user;
    if (req.cookies.token) {
        try {
            user = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        } catch (err) {
            user = { email: "", username: "" };
        }
    } else {
        user = { email: "", username: "" };
    }
    res.render('booking', { user });
});

// Book route (example with dynamic URL parameter)
app.get('/book?:id', (req, res) => {
    res.render('book');
});

// About route
app.get('/about', (req, res) => {
    res.render('aboutus');
});

// Logout route
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Catch-all for React front-end route handling
app.use(express.static(path.join(__dirname, 'client', 'build'))); // Serve static files

// Serve React index.html for any routes that React handles
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

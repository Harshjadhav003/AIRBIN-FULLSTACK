const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// Signup routes: display signup form and handle user registration
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// Login routes: display login form and handle user authentication
router.route("/login")
    .get(userController.renderloginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",
            { failureRedirect: '/login', failureFlash: true }),
        userController.login
    );

// Logout route: handle user logout
router.get("/logout",
    userController.logout
);
module.exports = router;

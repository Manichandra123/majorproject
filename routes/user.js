const express = require("express");
router = express.Router()
const User= require("../models/user.js");
const passport = require("passport");
const{saveredirectUrl} = require("../middleware.js")


const listingcontroller = require("../controllers/user.js");



router.route('/signup')
//signup
.get((listingcontroller.signup))
.post((listingcontroller.savesignup))

router.route('login')
.get((listingcontroller.login))
.post(saveredirectUrl, passport.authenticate("local", 
{failureRedirect:"/login" ,
 failureFlash:true ,
})
 ,(listingcontroller.savelogin));


//login

router.get("/login",  (listingcontroller.login));

router.post("/login" ,saveredirectUrl, passport.authenticate("local", 
{failureRedirect:"/login" ,
 failureFlash:true ,
})
,(listingcontroller.savelogin));

//logout

router.get("/logout" ,  (listingcontroller.logout))

module.exports = router;

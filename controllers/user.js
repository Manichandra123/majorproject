const User= require("../models/user.js");
const passport = require("passport");
const{saveredirectUrl} = require("../middleware.js")


module.exports.signup = (req ,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.savesignup = async(req, res)=>{
    try{
        let {username, email , password} = req.body;
        const newuser = new User({email , username});
        const registereduser = await User.register(newuser , password);
        await registereduser.save();
        req.login(registereduser, (err)=>{
         if(err){
             return next(err)
         }
         req.flash("success", " welcome to wanderlust");
        res.redirect("/listings");
        })
    } catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
    
    
};

module.exports.login = (req,res)=>{
    res.render("./users/login.ejs")
};

module.exports.savelogin = async(req,res)=>{
    req.flash("success" , " welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings" ; 
    res.redirect(redirectUrl);

};

module.exports.logout = (req , res, next)=>{
    req.logOut((err)=>{
        if(err){
            return(next(err));
        }
        req.flash("success" ,"your logged out");
        res.redirect("/listings");
    })
};
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
 
console.log(process.env);

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User =  require("./models/user.js");

const dburl =process.env.ATLAS_Url

main().then(()=>{
    console.log("conected to DB");
  })
  .catch(err => console.log(err));
async function main() {
    await mongoose.connect(dburl);
  }

const store = MongoStore.create({
    mongoUrl:dburl,
     crypto:{
        secret:"mysupersecrectstring" ,
     },
     touchAfter:24*3600,
})

store.on("error", ()=>{
    console.log(" error in  mongo session store");
});

const sessionoptions ={
    store,
    secret:"mysupersecrectstring" ,
resave: false,
saveUninitialized: true,
cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxage: 7*24*60*60*1000,
},
};
app.use(session(sessionoptions))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.Curuser = req.user;
    next();
});

// app.get("/demouser" , async(req, res)=>{
//     let fackuser = new User({
//         email:"mac@gmil.com",
//         username: "macbook",
//     });
//     let registerduser = await User.register(fackuser , "MAC@12345");
//     res.send(registerduser);
// });

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const users = require("./routes/user.js");

 
 
 
app.set("views engine" , "ejs")
app.set("views" ,path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs" , ejsMate); 
app.use(express.static(path.join(__dirname ,"public")))
 
 






 

app.use("/listings" , listings);
app.use("/listings" , reviews);
app.use("/" , users);

  
//errors 
 
app.all("*" , (req , res, next)=>{
    next(new ExpressError(404 , " page not found !"))
    res.send("page nat fond ! 404 ")
})
app.use((err , req ,res ,next)=>{
    let {statuscode , message} = err;
    res.render("error.ejs");
    // console.log(err);
    
})

app.listen(8080,()=>{
    console.log("server is working ");
});
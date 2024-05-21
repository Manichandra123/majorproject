const Listing = require("./models/Listing");
const Review = require("./models/review");
const  { reviewschema , listingschema} = require("/Users/manichandra/Desktop/coding/ majorproject/schema.js");


module.exports.isloggedin = (req, res , next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be login to create listing ");
        return res.redirect("/login");
        }
        next();
};

module.exports.saveredirectUrl = (req , res , next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isowner = async(req ,res, next)=>{
    let {id} = req. params;
    let listing = await Listing.findById(id);
    if (listing && listing.owner && res.locals.Curuser){
        if(!listing.owner.equals(res.locals.Curuser._id)){
            req.flash("error" , " you are not the owner of listing");
             return res.redirect(`/listings/${id}`);
           }
          
    }
    next();
}

module.exports.isauthor = async(req ,res, next)=>{
    let {id , reviewId} = req. params;
    let  review = await Review.findById(reviewId);
    if ( review&&  review.owner && res.locals.Curuser){
        if(!review.author.equals(res.locals.Curuser._id)){
            req.flash("error" , " you are not the  author of listing");
             return res.redirect(`/listings/${id}`);
           }
          
    }
    next();
}

 

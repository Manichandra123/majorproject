const Review = require("../models/review.js");
const Listing = require("../models/Listing.js"); 


const  {reviewschema  , listingschema} = require("/Users/manichandra/Desktop/coding/ majorproject/schema.js");

    module.exports.create = async(req ,res)=>{

    let listing = await Listing.findById(req.params.id ) 
    const newReview = new Review(req.body.review); 
    newReview.author = req.user._id;
     
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review save");
    req.flash("success" ,"new review created!")
    res.redirect(`/listings/${listing._id}`);
     
   };

   module.exports.delete = async(req ,res)=>{
    let {id ,reviewId} = req.params; 
    await Listing.findByIdAndUpdate(id , {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete( reviewId);
    req.flash("success" ,"deleted review !")
    res.redirect(`/listings/${id}`);

    }
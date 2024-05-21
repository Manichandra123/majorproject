const express = require("express");
const router = express();
const ExpressError = require("../utils/ExpressError");
const  { reviewschema } = require("/Users/manichandra/Desktop/coding/ majorproject/schema.js");
const Review = require("../models/review.js")
const Listing = require("../models/Listing.js"); 
const methodoverride = require("method-override");
const { isowner, isloggedin , isauthor } = require("../middleware.js");


const listingcontroller = require("../controllers/review.js");

const validatereviews = (req ,res , next)=>{
    let {error} =reviewschema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=> el.message).join(",");
      if(!review.rating){
            throw new ExpressError(400 , errmsg);
      }
    } else{
        next();
    }
  };
// post route
router.post('/:id/reviews' , isloggedin, validatereviews ,   (listingcontroller.create));
   
//delete

router.delete('/:id/reviews/:reviewId' ,isloggedin, isauthor,  (listingcontroller.delete));

  module.exports = router;

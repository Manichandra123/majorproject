const express = require("express");
router = express.Router()
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/Listing.js"); 
const Review = require("../models/review.js")
const  {reviewschema  , listingschema} = require("/Users/manichandra/Desktop/coding/ majorproject/schema.js");
const passport = require("passport");
const {isloggedin , isowner} = require("../middleware.js")
const multer  = require('multer')
const {storage} = require("../couldconfig.js")
const upload = multer({ storage})


const listingcontroller = require("../controllers/listing.js");

const validatereviews = (req ,res , next)=>{
    let {error} =reviewschema.validate(req.body);
    if(error){
      let errmsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400 , errmsg);
    } else{
        next();
    }
};

// new route
router.get("/new" ,  isloggedin,(listingcontroller.new));

router.route("/")
//index
.get(listingcontroller.index)
.post(isloggedin, isowner,upload.single('listing[image]') , listingcontroller.createlisting);
 
 


router.route('/:id')
//show route
.get((listingcontroller.show))
//update route
.put(isloggedin,isowner ,upload.single('listing[image]'), (listingcontroller.update))
//delete route 
.delete(isloggedin,isowner ,  (listingcontroller.delete));

//edit route 
router.get('/:id/edit',isloggedin,isowner , (listingcontroller.edit) );

 
module.exports = router;
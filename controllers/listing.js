const Listing = require("../models/Listing.js"); 
const  {reviewschema  , listingschema} = require("/Users/manichandra/Desktop/coding/ majorproject/schema.js");

module.exports.index = async(req ,res)=>{
    const allListings = await Listing.find({})
   res.render("./listings/index.ejs" , {allListings});
};

module.exports.new =   (req ,res)=>{
     res.render("listings/new.ejs" , );
 };
module.exports.show = async(req, res , next)=>{
    try{
    let {id} = req.params;
    const  listing = await Listing.findById(id).populate({path:"reviews" , populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error" , "listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
}catch(err){
    next(err);
}
};

module.exports.createlisting = async(req ,res , next)=>{
try{
      // let {title , description , price , location , country} = req.body;
      let url = req.file.path;
      let filename = req.file.filename;
      const newListings = new Listing(req.body.listing);
      newListings.owner = req.user._id;
      newListings.image = {url , filename};
      let result =listingschema.validate(res.body);
    //   console.log(result);
      await newListings.save().then((data)=>{
      //console.log(data);
      }).catch((err)=>{
        console.log(err);
      });
      req.flash("success" ,"new listing created!")
      res.redirect("listings");
   }catch(err){
      next(err);
    }
  };

module.exports.edit = async(req,res , next)=>{
    let {id} = req.params;
    const  listing = await Listing.findById(id);
    res.render("./listings/edit.ejs" , {listing});
    
 
};

module.exports.update = async(req,res , next)=>{
try{ 
   let {id} = req.params;
  let listing  = await Listing.findByIdAndUpdate(id , {...req.body.listing});
  if(typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   listing.image ={url , filename};
   await listing.save();

  }
    
   req.flash("success" ," listing updated!");
   res.redirect(`/listings/${id}`);
}catch(err){
    next(err);
}
};

module.exports.delete = async(req ,res , next)=>{
try{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id , {...req.body.listing});
    req.flash("success" ," deleted listing!");
    res.redirect("/listings");
}catch(err){
    next(err);
}
};
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.sampleListings = initData.sampleListings.map((obj)=> ({...obj , owner:'6644ab8a873934c7bc2ae966'}));
  await Listing.insertMany(initData.sampleListings);
  console.log("data was initialized");
};

initDB();
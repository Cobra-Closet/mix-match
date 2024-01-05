// const cloudinary = require("cloudinary").v2;
// import { v2 as cloudinary } from "cloudinary";

// const apiKey = process.env.CLOUD_API_KEY;
// const apiSecret = process.env.CLOUD_API_SECRET;

// cloudinary.config({
//   cloud_name: "duez7t7xv",
//   api_key: "apiKey",
//   api_secret: "apiSecret",
// });



//*** REMOVE THIS  ***//
const cloudinary = require("cloudinary").v2;

// const cld = new Cloudinary({ cloud: { cloudName: "duez7t7xv" } });
cloudinary.config({
  secure: true,
});
cloudinary.config({
  cloud_name: "duez7t7xv",
  api_key: "268615144321886",
  api_secret: "qphxsnfLxRK-Af-7598bItipLVM",
});
console.log(cloudinary.config());

module.exports = cloudinary;

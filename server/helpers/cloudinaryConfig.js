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
// cloudinary.config({
//   cloud_name: "duez7t7xv",
//   api_key: "268615144321886",
//   api_secret: "qphxsnfLxRK-Af-7598bItipLVM",
// });
console.log(cloudinary.config());


// const uploadImage = async (imagePath) => {
//   // Use the uploaded file's name as the asset's public ID and
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };
module.exports = cloudinary;

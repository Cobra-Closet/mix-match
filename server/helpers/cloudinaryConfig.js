const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duez7t7xv",
  api_key: "CLOUD_API_KEY",
  api_secret: "CLOUD_API_SECRET",
});

module.exports = cloudinary;

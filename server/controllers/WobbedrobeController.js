const db = require("../models/db.js");
//upload clothes
const multer = require("multer"); // Use multer for handling multipart/form-data
const cloudinary = require("../helpers/cloudinaryConfig");

const upload = multer({ dest: "uploads/" }); // Temporary storage

const wobbedrobeController = {};

// need to fix cloudify API - getting an error 

wobbedrobeController.getAllItems = (req, res, next) => {
  const itemType = req.params.itemType;
  db.query(`SELECT * FROM ${itemType};`)
    .then((data) => data.rows)
    .then((data) => (res.locals.all = data))
    .then((data) => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getAllItems middleware error: " +
          err,
        message: {
          err:
            "An error occurred when getting all " + itemType + " Err: " + err,
        },
      })
    );
};

wobbedrobeController.addItem = async (req, res, next) => {
  console.log("wardrobeController.addItem hit");
  console.log("this is req.body of addItem", req.body);
  const itemType = req.params.itemType;
  const { user_id, category, color, style, material } = req.body;
  console.log("this is user_id", user_id);

  let imageUrl = null;
  // check if user submitted a photo to upload
  if (req.file) {
    console.log("user submitted a photo", req.file);
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("this is the result of cloudinary upload", result);
      // result.secure_url is the URL of the uploaded image returned by Cloudinary
      imageUrl = result.url;
      res.locals.imageUrl = imageUrl;
      console.log("added to res.locals.imageUrl", res.locals.secure_imageUrl);
    } catch (err) {
      return next({
        log: `Error uploading image in wobbedrobeController.addItem. ERROR: ${err}`,
        message: { err: "Error uploading image. Please try again" },
      });
    }
  }
  // need to set up column in each table for an image url then write additional query text to include url in the database
//  const queryText = `INSERT INTO ${itemType} (user_id, category, color, style${
//    itemType === "shoes" ? "" : ", material"
//  }, photo_url) VALUES($1, $2, $3, $4${itemType === "shoes" ? "" : ", $5"}, $6) RETURNING *;`;

  // if itemType is anything other than shoes, include the material column and expect 6 parameters
  // if itemType is shoes, don't include material column and expect five parameters
  const queryText = `INSERT INTO ${itemType} (user_id, category, color, style${itemType !== "shoes" ? ", material" : ""}, photo_url) VALUES($1, $2, $3, $4${itemType !== "shoes" ? ", $5" : ""}, ${itemType !== "shoes" ? "$6" : "$5"}) RETURNING *;`;

  // const values = [user_id, category, color, style, imageUrl];

  let values;
  if (itemType !== "shoes") {
    values = [user_id, category, color, style, material, imageUrl];
  } else {
    values = [user_id, category, color, style, imageUrl];
  }

  // if (itemType !== "shoes") values.push(material);
  db.query(queryText, values)
    .then((data) => (res.locals[itemType] = data.rows[0]))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.addItems middleware error: " +
          err,
        message: {
          err:
            "An error occurred when adding an item of " +
            itemType +
            "Err: " +
            err,
        },
      })
    );
};

wobbedrobeController.getTopsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM tops WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.tops = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getTopsForUser middleware error: " +
          err,
        message: {
          err: "An error occurred when getting tops for user, Err: " + err,
        },
      })
    );
};

wobbedrobeController.getBottomsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM bottoms WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.bottoms = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getBottomsForUser middleware error: " +
          err,
        message: {
          err: "An error occurred when getting bottoms for user, Err: " + err,
        },
      })
    );
};

wobbedrobeController.getOverallsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM overalls WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.overalls = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getOverallsForUser middleware error: " +
          err,
        message: {
          err: "An error occurred when getting overalls for user, Err: " + err,
        },
      })
    );
};

wobbedrobeController.getShoesForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM shoes WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.shoes = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getShoesForUser middleware error: " +
          err,
        message: {
          err: "An error occurred when getting shoes for user, Err: " + err,
        },
      })
    );
};

wobbedrobeController.deleteItem = (req, res, next) => {
  console.log('this is wobbedrobeController.deleteItem req.params', req.params);
  const { itemType, id } = req.params;
  const idName =
    (itemType === "shoes" ? "shoes" : itemType.slice(0, itemType.length - 1)) +
    "_id";
  db.query(`DELETE FROM ${itemType} WHERE ${idName} = ${id} RETURNING *;`)
    .then((data) => data.rows[0])
    .then((data) => (res.locals.deletedItem = data))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.deleteItem middleware error: " +
          err,
        message: {
          err: "An error occurred when deleting an item, Err: " + err,
        },
      })
    );
};

wobbedrobeController.getById = (req, res, next) => {
  const { itemType, id } = req.params;
  const idName =
    (itemType === "shoes" ? "shoes" : itemType.slice(0, itemType.length - 1)) +
    "_id";
  db.query(`SELECT * FROM ${itemType} WHERE ${idName} = ${id}`)
    .then((data) => {
      console.log(data.rows);
      return data.rows[0];
    })
    .then((data) => (res.locals.item = data))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.getById middleware error: " +
          err,
        message: {
          err:
            "An error occurred when getting an item of " +
            itemType +
            " by id, Err: " +
            err,
        },
      })
    );
};

wobbedrobeController.updateItem = (req, res, next) => {
  const { propertyToChange, updatedProperty } = req.body;
  const { itemType, id } = req.params;
  console.log(req.params);
  const idName =
    (itemType === "shoes" ? "shoes" : itemType.slice(0, itemType.length - 1)) +
    "_id";
  db.query(
    `UPDATE ${itemType} ` +
      `SET ${propertyToChange} = $1 ` +
      `WHERE ${idName} = ${id} ` +
      `RETURNING *;`,
    [updatedProperty]
  )
    .then((data) => data.rows[0])
    .then((data) => {
      res.locals.updatedItem = itemType;
      res.locals.updatedProperty = propertyToChange;
      res.locals.updatedItem = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          "Express error handler caught wobbedrobeController.updateItem middleware error: " +
          err,
        message: {
          err: "An error occurred when updating an item, Err: " + err,
        },
      })
    );
};

module.exports = wobbedrobeController;

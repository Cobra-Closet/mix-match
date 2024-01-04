const express = require('express');
const router = express.Router();

const wobbedrobeController = require('../controllers/WobbedrobeController.js');
const ootdController = require('../controllers/ootdController.js');

router.post('/add/:itemType', wobbedrobeController.addItem, (req, res) => {
  console.log('POST /wobbedrobe/add/:itemType route hit');
  const itemType = req.params.itemType;
  const response = {};
  response[`Added to ${itemType}`] = res.locals[itemType];
  res.status(200).json(response);
});

router.get(
  '/getAll/:itemType',
  wobbedrobeController.getAllItems,
  (req, res) => {
    console.log('GET /wobbedrobe/getAll/:itemType route hit');
    const { itemType } = req.params;
    const response = {};
    response[itemType] = res.locals.all;
    res.status(200).json(response);
  }
);

router.get(
  '/getById/:itemType/:id',
  wobbedrobeController.getById,
  (req, res) => {
    console.log('GET /wobbedrobe/getById/:itemType/:id route hit');
    const { itemType } = req.params;
    const response = { itemType, item: res.locals.item };
    res.status(200).json(response);
  }
);

router.delete(
  '/delete/:itemType/:id',
  ootdController.deleteDependentOutfits,
  wobbedrobeController.deleteItem,
  (req, res) => {
    console.log('DELETE /wobbedrobe/delete/:itemType/:id route hit');
    console.log(res.locals);
    res.status(200).json(res.locals);
  }
);

router.post(
  '/update/:itemType/:id',
  wobbedrobeController.updateItem,
  (req, res) => {
    console.log('POST /wobbedrobe/update/:itemType/:id route hit');
    console.log(req.body);
    console.log(req.locals);
    res.status(200).json(res.locals);
  }
);

module.exports = router;

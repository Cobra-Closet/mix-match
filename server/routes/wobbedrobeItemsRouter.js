const express = require('express');
const router = express.Router();

const wobbedrobeController = require('../controllers/wobbedrobeController.js');

router.post('/add/:itemType', wobbedrobeController.addItem, (req, res) => {
  console.log('POST /wobbedrobe/add/:itemType route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.get(
  '/getAll/:itemType',
  wobbedrobeController.getAllItems,
  (req, res) => {
    console.log('GET /wobbedrobe/getAll/:itemType route hit');
    res.status(200).json({});
  }
);

router.get('/get/:itemType', (req, res) => {
  console.log('GET /wobbedrobe/get/:itemType route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.delete('/delete/:itemType/:id', (req, res) => {
  console.log('DELETE /wobbedrobe/delete/:itemType/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.post('/update/:itemType/:id', (req, res) => {
  console.log('POST /wobbedrobe/update/:itemType/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

module.exports = router;

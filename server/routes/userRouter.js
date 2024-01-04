const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');
const wobbedrobeController = require('../controllers/WobbedrobeController.js');
const ootdController = require('../controllers/ootdController.js');

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  wobbedrobeController.getTopsForUser,
  wobbedrobeController.getBottomsForUser,
  wobbedrobeController.getOverallsForUser,
  wobbedrobeController.getShoesForUser,
  ootdController.getOutfitsForUser,
  (req, res) => {
    console.log('POST /user/login route hit');
    console.log('res.locals.userData', res.locals.userData);
    // const { user_id, username } = res.locals.userData;
    res.status(200).json({
      success: true,
      user_id: res.locals.userData.user_id, 
      username: res.locals.userData.username,
      wardrobe: {
        top: res.locals.tops,
        bottom: res.locals.bottoms,
        overall: res.locals.overalls,
        shoes: res.locals.shoes,
      },
      outfit: res.locals.outfits,
    });
  }
);

router.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('POST /user/signup route hit');
    const { user_id, username } = res.locals.userData;
    res.status(200).json({
      user_id,
      username,
      wardrobe: {
        top: [],
        bottom: [],
        overall: [],
        shoes: [],
      },
      outfit: [],
    });
  }
);

router.delete('/delete', (req, res) => {
  console.log('DELETE /user/delete route hit');
  res.status(200).json({});
});

router.get('/all', userController.getAllUsers, (req, res) => {
  res.status(200).json({});
});

router.get(
  '/get/:id',
  userController.getUserById,
  wobbedrobeController.getTopsForUser,
  wobbedrobeController.getBottomsForUser,
  wobbedrobeController.getOverallsForUser,
  wobbedrobeController.getShoesForUser,
  ootdController.getOutfitsForUser,
  (req, res) => {
    console.log('GET /user/get/:id route hit');
    const { user_id, username } = res.locals.userData;
    res.status(200).json({
      user_id,
      username,
      wardrobe: {
        top: res.locals.tops,
        bottom: res.locals.bottoms,
        overall: res.locals.overalls,
        shoes: res.locals.shoes,
      },
      outfit: res.locals.outfits,
    });
  }
);

module.exports = router;

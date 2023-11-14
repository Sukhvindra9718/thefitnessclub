const express = require('express');
const router = express.Router();
const {registerUser,loginUser,verifyUser,logoutUser,getUserDetail,forgotPassword,resetPassword,updatePassword,updateProfile,getAllUsers, deleteUser, takeMembership} = require('../Controllers/GymOwnerController.js');
const {uploadImage} = require('../Utils/UploadImage.js');
const {authorizationGymOwner,authorizationAdmin,authorizationGymTrainee,authorizationGymTrainer,Authentication} = require('../Utils/Auth.js');
const { getImage } = require('../Utils/GetImage.js');

// Common Routes
router.route('/getUserDetail/:id').get(Authentication,getUserDetail);


// Gym Owner Routes
router.route('/register').post(uploadImage,registerUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyUser);
router.route('/logout').post(Authentication,logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/update').put(Authentication,authorizationGymOwner(),updatePassword);
router.route('/update/profile').put(Authentication,uploadImage,updateProfile);
router.route('/deleteUser/:id').delete(Authentication,authorizationGymOwner(),deleteUser);
router.route('/membership').post(Authentication,authorizationGymOwner(),takeMembership);


// Gym Trainer Routes


// Gym Trainee Routes


// Admin Routes
// router.route('/getAllUsers').get(Authentication,authorizationAdmin(),getAllUsers);

router.route('/getAllUsers').get(getAllUsers);


router.get('/user/:userId/profile-image', getImage);
module.exports = router;
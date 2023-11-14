const express = require('express');
const router = express.Router();
const {registerUser,loginUser,verifyUser,logoutUser,getUserDetail,forgotPassword,resetPassword,updatePassword,updateProfile, deleteUser, takeMembership,getAllTrainees} = require('../Controllers/TraineeController.js');
const {uploadImage} = require('../Utils/UploadImage.js');
const {authorizationGymTrainee,Authentication,authorizationGymOwner} = require('../Utils/Auth.js');
const { getImage } = require('../Utils/GetImage.js');

// Common Routes
router.route('/getUserDetail/:id').get(Authentication,getUserDetail);


// Gym Owner Routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').post(verifyUser);
router.route('/logout').post(Authentication,logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/update').put(Authentication,authorizationGymTrainee(),updatePassword);
router.route('/update/profile').put(Authentication,uploadImage,updateProfile);
router.route('/deleteUser/:id').delete(Authentication,authorizationGymTrainee(),deleteUser);
router.route('/membership').post(Authentication,authorizationGymTrainee(),takeMembership);

router.route('/getAllTrainee').get(Authentication,authorizationGymOwner(),getAllTrainees);
router.get('/trainee/:userId/profile-image', getImage);
module.exports = router;
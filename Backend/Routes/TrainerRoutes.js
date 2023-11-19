const express = require('express');
const router = express.Router();
const {registerTrainer,loginTrainer,verifyTrainer,logoutTrainer,getTrainerDetail,forgotPassword,resetPassword,updatePassword,updateProfile, deleteTrainer, takeMembership,getAllTrainers} = require('../Controllers/TrainerController.js');
const {uploadImage} = require('../Utils/UploadImage.js');
const {authorizationGymTrainer,Authentication,authorizationGymOwner} = require('../Utils/Auth.js');

// Common Routes
router.route('/getTrainerDetail/:id').get(Authentication,getTrainerDetail);


// Gym Owner Routes
router.route('/register').post(authorizationGymOwner,uploadImage,registerTrainer);
router.route('/login').post(loginTrainer);
router.route('/verify').post(verifyTrainer);
router.route('/logout').post(Authentication,logoutTrainer);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/update').put(Authentication,authorizationGymTrainer,updatePassword);
router.route('/update/profile').put(Authentication,uploadImage,updateProfile);
router.route('/deleteTrainer/:id').delete(Authentication,authorizationGymTrainer,deleteTrainer);
router.route('/membership').post(Authentication,authorizationGymTrainer,takeMembership);


router.route('/getAllTrainers').get(authorizationGymOwner,getAllTrainers);

module.exports = router;
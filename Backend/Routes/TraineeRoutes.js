const express = require('express');
const router = express.Router();
const {registerTrainee,loginTrainee,verifyTrainee,logoutTrainee,getTraineeDetail,forgotPassword,resetPassword,updatePassword,updateProfile, deleteTrainee, takeMembership,getAllTrainees} = require('../Controllers/TraineeController.js');
const {uploadImage} = require('../Utils/UploadImage.js');
const {authorizationGymTrainee,Authentication,authorizationGymOwner} = require('../Utils/Auth.js');
const { getImage } = require('../Utils/GetImage.js');

// Common Routes
router.route('/getTraineeDetail/:id').get(Authentication,getTraineeDetail);


// Gym Owner Routes
router.route('/register').post(authorizationGymOwner,uploadImage,registerTrainee);
router.route('/login').post(loginTrainee);
router.route('/verify').post(verifyTrainee);
router.route('/logout').post(Authentication,logoutTrainee);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/update').put(Authentication,authorizationGymTrainee,updatePassword);
router.route('/update/profile').put(Authentication,uploadImage,updateProfile);
router.route('/deleteTrainee/:id').delete(authorizationGymOwner,deleteTrainee);
router.route('/membership').post(Authentication,authorizationGymTrainee,takeMembership);

router.route('/getAllTrainee').get(authorizationGymOwner,getAllTrainees);
router.get('/trainee/:userId/profile-image', getImage);
module.exports = router;
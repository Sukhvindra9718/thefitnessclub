const multer = require("multer");



// Configure multer to store uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage });
console.log("upload", upload)

// Upload a image using multer and store it in memory buffer
exports.uploadImage = upload.single("profile_image");




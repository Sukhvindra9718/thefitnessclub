const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.email + user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
      ),
      httpOnly: true,
    };

    try {
      res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user
      });
    } catch (error) {
      console.error('Error setting cookie:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  };
  
module.exports = sendToken;
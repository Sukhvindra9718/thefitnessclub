const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.email + user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 1 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
    });
  };
  
module.exports = sendToken;
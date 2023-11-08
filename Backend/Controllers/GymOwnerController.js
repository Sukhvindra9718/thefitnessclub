const ErrorHandler = require("../Utils/ErrorHandler.js");
const CatchAsyncErrors = require("../Middlewares/CatchAsyncErrors.js");
const sendToken = require("../Utils/jwtToken.js");
const SendEmail = require("../Utils/SendEmail.js");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const { createTable } = require("../Utils/checkIfTableExists.js");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432, // Default PostgreSQL port
});

exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;
  const profileImage = req.file.buffer; // multer file buffer

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedPassword = await bcrypt.hash(password, 10);

  const isVerified = false;
  // const createdAt = Date.now('YYYY-MM-DD');
  const role = "gymOwner";
  const resetPasswordToken = undefined;
  const resetPasswordTokenExpire = undefined;

  const query =
    "INSERT INTO users (name, email, password,phoneNumber,address,otp,isverified,role,profile_image,resetpasswordtoken,resetpasswordtokenexpire) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)";

  // create html mail template with otp verification code
  const message = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #0073e6;
                color: #ffffff;
                padding: 20px;
            }
            .content {
                background-color: #ffffff;
                padding: 20px;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Action Required : One-Time Verification Code</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>Your One-Time Password OTP for verification is:</p>
                <p style="font-size: 24px; font-weight: bold;text-align:center;">${otp}</p>
                <p>This OTP is valid for a limited time. Do not share it with anyone.</p>
            </div>
            <div class="footer">
                <p>If you did not request this OTP, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  try {
    await pool.query(query, [
      name,
      email,
      hashedPassword,
      phoneNumber,
      address,
      otp,
      isVerified,
      role,
      profileImage,
      resetPasswordToken,
      resetPasswordTokenExpire,
    ]);

    const result = await SendEmail({
      email: email,
      subject: `One-time Verification Code`,
      message,
    });

    if (result) {
      res.status(200).json({
        success: true,
        message: "Registered Successfully",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  pool.end(); // Close the pool when done
});

exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  let user = null;
  //Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  user = await getUserFromDatabase("email",email);
  console.log(user)
  //Checks if password is correct or not
  if (user.isVerified === false) {
    return next(new ErrorHandler("Please verify your email", 401));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

exports.verifyUser = CatchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;
  //Checks if otp is valid entered by user
  if (!otp) {
    return next(new ErrorHandler("Please enter a valid otp", 400));
  }
  //Finding user in database

  const user = await getUserFromDatabase("email",email);

  //Checks if otp is correct or not
  if (user.otp !== otp) {
    return next(new ErrorHandler("Invalid otp", 401));
  }

  if (user.otp === otp) {
    // await user.save();
    try {
      const client = await pool.connect();
      const query = "UPDATE users SET otp = $1, isverified = $2 WHERE email = $3";
      await client.query(query, ["", true, email]);

    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    } finally {
      pool.end(); // Close the pool when done
    }
    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler("Invalid otp", 401));
  }
});

exports.logoutUser = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.getUserDetail = CatchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  let user = null;
  let success = false;
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await client.query(query, [userId]);

    if (result.rows.length !== 0) {
      success = true;
      user = result.rows[0];
    }


  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } finally {
    pool.end(); // Close the pool when done
  }
  res.status(200).json({
    success,
    user,
  });
});

exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  // send forgot password email
  const { email } = req.body;
  const user = await getUserFromDatabase("email",email);

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = getResetPasswordToken(user);

  // create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Forgot Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              text-align: center;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .header {
              background-color: #0073e6;
              color: #ffffff;
              padding: 20px;
          }
          .content {
              background-color: #ffffff;
              padding: 20px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 10px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Forgot Password</h1>
          </div>
          <div class="content">
              <p>Dear User,</p>
              <p>You've requested to reset your password. To reset your password, click the following link:</p>
              <p>
                  <a href="${resetUrl}" style="background-color: #0073e6; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                      Reset Password
                  </a>
              </p>
              <p>If you did not request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
              <p>Thank you for using our service.</p>
          </div>
      </div>
  </body>
  </html>
  `;

  try {
    await SendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const user = await getUserFromDatabase("resetpasswordtoken",req.params.token);

  if(user.resetpasswordtokenexpire < new Date()){
    return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
  }

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // setup new password
  const password = await bcrypt.hash(newPassword, 10);

  const newUserData = {
    name: user.name,
    email: user.email,
    password: password,
    phonenumber: user.phonenumber,
    address: user.address,
    otp: user.otp,
    isverified: user.isverified,
    role: user.role,
    profile_image: user.profile_image,
    createdat: user.createdat,
    resetpasswordtoken: undefined,
    resetpasswordtokenexpire: undefined,
  };
  updateUserInDatabase(newUserData);
  res.status(200).json({
    success: true,
    message: "Password updated successfully, Please login with new password",
  });
});

exports.updatePassword = CatchAsyncErrors(async (req, res, next) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Confirm Password does not match", 400));
  }
  // let user = await getUserFromDatabase("id",req.user.id);

  // check previous user password
  const isPasswordMatched = await bcrypt.compare(
    req.body.oldPassword,
    req.user.password
  );
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  let password = await bcrypt.hash(req.body.newPassword, 10);
  try {
    const client = await pool.connect();
    const query = "UPDATE users SET password = $1 WHERE email = $2";

    await client.query(query, [password, req.user.email]);

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } finally {
    pool.end(); // Close the pool when done
  }
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

exports.updateProfile = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, phoneNumber, address,role} = req.body;
  const profileImage = req?.file?.buffer == undefined ? undefined : req.file.buffer; // multer file buffer

  const user = await getUserFromDatabase("id",req.user.id);
  let newRole = role != undefined? role : user.role;


  const newUserData = {
    name: name,
    email: email,
    password: user.password,
    phonenumber: phoneNumber,
    address: address,
    otp: user.otp,
    isverified: user.isverified,
    role: newRole ,
    profile_image: profileImage === undefined ? user.profile_image : profileImage,
    createdat: user.createdat,
    resetpasswordtoken: user.resetpasswordtoken,
    resetpasswordtokenexpire: user.resetpasswordtokenexpire,
  };

  updateUserInDatabase(newUserData);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});


exports.getAllUsers = CatchAsyncErrors(async (req, res, next) => {
  let users = [];
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM users`;
    const result = await client.query(query, []);

    if (result.rows.length !== 0) {
      users = result.rows;
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } 
  res.status(200).json({
    success: true,
    users,
  })
});

exports.deleteUser = CatchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const client = await pool.connect();
    const query = `DELETE FROM users WHERE id = $1`;
    await client.query(query, [userId]);

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } 
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  })
});

exports.takeMembership = CatchAsyncErrors(async (req, res, next) => {
  const {email, membershipType,membershipPrice, membershipDuration} = req.body;

  try {
    const client = await pool.connect();
    // Update users table
    const query = "UPDATE users SET membership_type = $1, membership_price = $2, membership_duration = $3 WHERE email = $4";
    await client.query(query, [membershipType, membershipPrice, membershipDuration, email]);

    
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  res.status(200).json({
    success: true,
    membership,
  })
});

const getUserFromDatabase = async (findById,value) => {
  let user = null;
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM users WHERE ${findById} = $1`;
    const result = await client.query(query, [value]);

    if (result.rows.length !== 0) {
      user = result.rows[0];
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } 
  return user;
};

const updateUserInDatabase = async (user) => {
  try {
    const client = await pool.connect();
    const query =
      "UPDATE users SET name = $1, email = $2, password = $3, phonenumber = $4, address = $5, otp = $6, isverified = $7, role = $8, profile_image = $9,createdat = $10, resetpasswordtoken = $11, resetpasswordtokenexpire = $12 WHERE email = $2";

    await client.query(query, [
      user.name,
      user.email,
      user.password,
      user.phonenumber,
      user.address,
      user.otp,
      user.isverified,
      user.role,
      user.profile_image,
      user.createdat,
      user.resetpasswordtoken,
      user.resetpasswordtokenexpire,
    ]);

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  } 
};

const getResetPasswordToken = (user) => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time

  
  // ✅ Add 10 minutes to the current date

  let resetPasswordExpire = addMinutes(new Date(), 10);
  // resetPasswordExpire = resetPasswordExpire.split("GMT")[0];
  const newUserData = {
    name: user.name,
    email: user.email,
    password: user.password,
    phonenumber: user.phonenumber,
    address: user.address,
    otp: user.otp,
    isverified: user.isverified,
    role: user.role,
    profile_image: user.profile_image,
    createdat: user.createdat,
    resetpasswordtoken: resetPasswordToken,
    resetpasswordtokenexpire: resetPasswordExpire,
  };

  updateUserInDatabase(newUserData);
  return resetPasswordToken;
};


function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}



// Replace these variables with your table and column definitions

// const columns = [
//   { name: "id", type: "SERIAL PRIMARY KEY" },
//   { name: "name", type: "VARCHAR(100) NOT NULL" },
//   { name: "email", type: "VARCHAR(60) UNIQUE NOT NULL" },
//   { name: "password", type: "VARCHAR(500) NOT NULL" },
//   { name: "phoneNumber", type: "VARCHAR(10) NOT NULL" },
//   { name: "address", type: "VARCHAR(255) NOT NULL" },
//   { name: "otp", type: "VARCHAR(8)" },
//   { name: "isVerified", type: "BOOLEAN" },
//   { name: "role", type: "VARCHAR(15)" },
//   { name: "profile_image", type: "BYTEA NOT NULL" },
//   { name: "createdAt", type: "timestamptz DEFAULT NOW()" },
//   { name: "resetPasswordToken", type: "VARCHAR(500)" },
//   { name: "resetPasswordTokenExpire", type: "timestamptz" },
// ];

// createTable("users", columns);
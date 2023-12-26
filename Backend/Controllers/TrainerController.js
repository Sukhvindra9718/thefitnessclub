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

exports.registerTrainer = CatchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    AadharCard,
    DOB,
    Address,
    email,
    phoneNumber,
    pincode,
    city,
    state,
    country,
    bankname,
    salary,
    accountNumber,
    IFSCCode,
    status,
    joiningDate,
  } = req.body;

  const profileImage =
    req?.file?.buffer === undefined ? undefined : req.file.buffer; // multer file buffer

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedPassword = await bcrypt.hash(firstname, 10);
  const gymOwnerId = req.user.id;
  const isVerified = false;
  const role = "trainer";
  const resetPasswordToken = undefined;
  const resetPasswordTokenExpire = undefined;

  const query =
    "INSERT INTO trainer (firstname,lastname,AadharCard,DOB,Address,email,phoneNumber,pincode,city,state,country,bankname,salary,accountNumber,IFSCCode,status,joiningDate,otp,isVerified,role,profile_image,createdAt,resetPasswordToken,resetPasswordTokenExpire,gymOwnerId,password) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)";

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
      firstname,
      lastname,
      AadharCard,
      DOB,
      Address,
      email,
      phoneNumber,
      pincode,
      city,
      state,
      country,
      bankname,
      salary,
      accountNumber,
      IFSCCode,
      status,
      joiningDate,
      otp,
      isVerified,
      role,
      profileImage,
      new Date(),
      resetPasswordToken,
      resetPasswordTokenExpire,
      gymOwnerId,
      hashedPassword,
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
});

exports.loginTrainer = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  let user = null;
  //Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  user = await getUserFromDatabase("email", email);

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

exports.verifyTrainer = CatchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  //Checks if otp is valid entered by user
  if (!otp) {
    return next(new ErrorHandler("Please enter a valid otp", 400));
  }
  //Finding user in database

  const user = await getUserFromDatabase("email", email);

  //Checks if otp is correct or not
  if (user.otp !== otp) {
    return next(new ErrorHandler("Invalid otp", 401));
  }

  if (user.otp === otp) {
    // await user.save();
    try {
      const client = await pool.connect();
      const query =
        "UPDATE trainer SET otp = $1, isverified = $2 WHERE email = $3";
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

exports.logoutTrainer = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.getTrainerDetail = CatchAsyncErrors(async (req, res, next) => {
  let user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  // send forgot password email
  const { email } = req.body;
  const user = await getUserFromDatabase("email", email);

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
  const user = await getUserFromDatabase(
    "resetpasswordtoken",
    req.params.token
  );

  if (user.resetpasswordtokenexpire < new Date()) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
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
    const query = "UPDATE trainer SET password = $1 WHERE email = $2";

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
  const profileImage =
    req?.file?.buffer == undefined ? undefined : req.file.buffer; // multer file buffer

  const newUserData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    aadharcard: req.body.aadharcard,
    dob: req.body.dob,
    address: req.body.address,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    pincode: req.body.pincode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    bankname: req.body.bankname,
    salary: req.body.salary,
    accountnumber: req.body.accountnumber,
    ifsccode: req.body.ifsccode,
    status: req.body.status,
    joiningdate: req.body.joiningdate,
    profile_image: profileImage,
    id: req.body.id,
  };

  updateUserInDatabase(newUserData);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

exports.getAllTrainers = CatchAsyncErrors(async (req, res, next) => {
  console.log("get all trainer");
  let trainers1 = [];
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM trainer where gymownerId= ${req.user.id}`;
    const result = await client.query(query, []);

    if (result.rows.length !== 0) {
      trainers1 = result.rows;
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  const trainers = trainers1.map((trainer) => {
    return {
      ...trainer,
      profile_image: trainer.profile_image.toString("base64"),
    };
  });

  res.status(200).json({
    success: true,
    trainers,
  });
});

exports.deleteTrainer = CatchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const query = `DELETE FROM trainer WHERE id = $1`;
    await client.query(query, [userId]);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.takeMembership = CatchAsyncErrors(async (req, res, next) => {
  const { email, membershipType, membershipPrice, membershipDuration } =
    req.body;

  try {
    const client = await pool.connect();
    // Update trainer table
    const query =
      "UPDATE trainer SET membership_type = $1, membership_price = $2, membership_duration = $3 WHERE email = $4";
    await client.query(query, [
      membershipType,
      membershipPrice,
      membershipDuration,
      email,
    ]);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  res.status(200).json({
    success: true,
    membership,
  });
});

const getUserFromDatabase = async (findById, value) => {
  let user = null;
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM trainer WHERE ${findById} = $1`;
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
    if (user.profile_image === undefined) {
      const query =
        "UPDATE trainer SET firstname = $1, lastname = $2, email = $3, phonenumber = $4,pincode = $5, dob = $6, city = $7, aadharcard = $8, state = $9, address = $10, country = $11, joiningdate = $12, status = $13, bankname = $14,accountnumber = $15, ifsccode = $16,salary = $17 WHERE id = $18";
      await client.query(query, [
        user.firstname,
        user.lastname,
        user.email,
        user.phonenumber,
        user.pincode,
        user.dob,
        user.city,
        user.aadharcard,
        user.state,
        user.address,
        user.country,
        user.joiningdate,
        user.status,
        user.bankname,
        user.accountnumber,
        user.ifsccode,
        user.salary,
        user.id,
      ]);
    } else {
      const query =
        "UPDATE trainer SET firstname = $1, lastname = $2, email = $3, phonenumber = $4,pincode = $5, dob = $6, city = $7, aadharcard = $8, state = $9, address = $10, country = $11, joiningdate = $12, status = $13, bankname = $14,accountnumber = $15, ifsccode = $16,salary = $17,profile_image = $18 WHERE id = $19";

      await client.query(query, [
        user.firstname,
        user.lastname,
        user.email,
        user.phonenumber,
        user.pincode,
        user.dob,
        user.city,
        user.aadharcard,
        user.state,
        user.address,
        user.country,
        user.joiningdate,
        user.status,
        user.bankname,
        user.accountnumber,
        user.ifsccode,
        user.salary,
        user.profile_image,
        user.id,
      ]);
    }
  } catch (error) {
    console.log(error);
    return error;
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
//   {name: "id", type: "SERIAL PRIMARY KEY" },
//   {name: "gymOwnerId",type:"INTEGER NOT NULL"},
//   {name:"firstname",type:"VARCHAR(100) NOT NULL"},
//   {name:"lastname",type:"VARCHAR(100) NOT NULL"},
//   {name:"AadharCard",type:"VARCHAR(12) NOT NULL"},
//   {name:"DOB",type:"DATE NOT NULL"},
//   {name:"Address",type:"VARCHAR(255) NOT NULL"},
//   {name:"email",type:"VARCHAR(60) UNIQUE NOT NULL"},
//   {name:"phoneNumber",type:"VARCHAR(10) NOT NULL"},
//   {name:"pincode",type:"VARCHAR(6) NOT NULL"},
//   {name:"city",type:"VARCHAR(100) NOT NULL"},
//   {name:"state",type:"VARCHAR(100) NOT NULL"},
//   {name:"country",type:"VARCHAR(100) NOT NULL"},
//   {name:"bankname",type:"VARCHAR(100) NOT NULL"},
//   {name:"salary",type:"DECIMAL(10,2) NOT NULL"},
//   {name:"accountNumber",type:"VARCHAR(20) NOT NULL"},
//   {name:"IFSCCode",type:"VARCHAR(20) NOT NULL"},
//   {name:"status",type:"VARCHAR(20) NOT NULL"},
//   {name:"joiningDate",type:"DATE NOT NULL"},
//   {name: "otp", type: "VARCHAR(8)" },
//   {name: "isVerified", type: "BOOLEAN" },
//   {name: "role", type: "VARCHAR(15)" },
//   {name: "profile_image", type: "BYTEA NOT NULL" },
//   {name: "createdAt", type: "timestamptz DEFAULT NOW()" },
//   {name: "resetPasswordToken", type: "VARCHAR(500)" },
//   {name: "resetPasswordTokenExpire", type: "timestamptz" },
// ]
// createTable("trainer", columns);

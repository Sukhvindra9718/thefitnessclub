const ErrorHandler = require("../Utils/ErrorHandler.js");
const CatchAsyncErrors = require("../Middlewares/CatchAsyncErrors.js");
const sendToken = require("../Utils/jwtToken.js");
const SendEmail = require("../Utils/SendEmail.js");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { createTable } = require("../Utils/checkIfTableExists.js");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432, // Default PostgreSQL port
});

exports.registerTrainee = CatchAsyncErrors(async (req, res, next) => {
  const {
    firstname,
    lastname,
    AadharCard,
    DOB,
    Address,
    email,
    phoneNumber,
    pincode,
    state,
    city,
    country,
    status,
    extentMembership,
    discount,
    receiptNumber,
    gender,
    joiningDate,
    group,
    planStartDate,
    planEndDate,
    plan,
    duration,
    planPrice,
    totalAmount,
    amountPaid,
    balanceAmount,
    modeOfPayment,
  } = req.body;
  const profileImage =
    req?.file?.buffer === undefined ? undefined : req.file.buffer; // multer file buffer

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedPassword = await bcrypt.hash(otp.toString(), 10);
  const gymOwnerId = req.user.id;
  const isVerified = false;
  const role = "trainee";
  const resetPasswordToken = undefined;
  const resetPasswordTokenExpire = undefined;
  const query =
    "INSERT INTO trainee (firstname,lastname,aadharcard,dob,address, email,password,phonenumber,pincode,city,state,country,status,extentmembership,discount,receiptnumber,gender,joiningdate,groups,planstartdate,planenddate,plan,duration,planprice,totalamount,amountpaid,balanceamount,modeofpayment,profile_image,otp,isverified,role,resetpasswordtoken,resetpasswordtokenexpire,gymownerid) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35)";

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
      hashedPassword,
      phoneNumber,
      pincode,
      city,
      state,
      country,
      status,
      extentMembership,
      discount,
      receiptNumber,
      gender,
      joiningDate,
      group,
      planStartDate,
      planEndDate,
      plan,
      duration,
      planPrice,
      totalAmount,
      amountPaid,
      balanceAmount,
      modeOfPayment,
      profileImage,
      otp,
      isVerified,
      role,
      resetPasswordToken,
      resetPasswordTokenExpire,
      gymOwnerId,
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

exports.loginTrainee = CatchAsyncErrors(async (req, res, next) => {
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

exports.verifyTrainee = CatchAsyncErrors(async (req, res, next) => {
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
        "UPDATE trainee SET otp = $1, isverified = $2 WHERE email = $3";
      await client.query(query, ["", true, email]);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } else {
    return next(new ErrorHandler("Invalid otp", 401));
  }
});

exports.logoutTrainee = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.getTraineeDetail = CatchAsyncErrors(async (req, res, next) => {
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
    const query = "UPDATE trainee SET password = $1 WHERE email = $2";

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
  const {
    firstname,
    lastname,
    email,
    phonenumber,
    address,
    dob,
    pincode,
    aadharcard,
    country,
    joiningdate,
    state,
    status,
    city,
    gender,
    userId,
  } = req.body;
  const profileImage =
    req?.file?.buffer == undefined ? undefined : req.file.buffer; // multer file buffer


  const newUserData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phonenumber: phonenumber,
    address: address,
    dob: dob,
    pincode: pincode,
    aadharcard: aadharcard,
    country: country,
    joiningdate: joiningdate,
    state: state,
    status: status,
    city: city,
    gender: gender,
    profile_image: profileImage,
    id: userId,
  };
  updateUserInDatabase(newUserData);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

exports.getAllTrainees = CatchAsyncErrors(async (req, res, next) => {
  console.log("Get all trainees");
  let trainees1 = [];
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM trainee where gymownerid = ${req.user.id}`;
    const result = await client.query(query, []);

    if (result.rows.length !== 0) {
      trainees1 = result.rows;
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  const trainees = trainees1.map((trainee) => {
    return {
      ...trainee,
      profile_image: trainee.profile_image.toString("base64"),
    };
  });
  res.status(200).json({
    success: true,
    trainees,
  });
});

exports.deleteTrainee = CatchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const client = await pool.connect();
    const query = `DELETE FROM trainee WHERE id = $1`;
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
    // Update trainee table
    const query =
      "UPDATE trainee SET membership_type = $1, membership_price = $2, membership_duration = $3 WHERE email = $4";
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
    const query = `SELECT * FROM trainee WHERE ${findById} = $1`;
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
        "UPDATE trainee SET firstname = $1,lastname = $2, email = $3,phonenumber = $4,address = $5,dob = $6,pincode = $7, aadharcard = $8,country = $9, joiningdate = $10,state = $11, status = $12, city = $13,gender = $14 WHERE id = $15";
      await client.query(query, [
        user.firstname,
        user.lastname,
        user.email,
        user.phonenumber,
        user.address,
        user.dob,
        user.pincode,
        user.aadharcard,
        user.country,
        user.joiningdate,
        user.state,
        user.status,
        user.city,
        user.gender,
        user.id,
      ]);
    } else {
      const query =
        "UPDATE trainee SET firstname = $1,lastname = $2, email = $3,phonenumber = $4,address = $5,dob = $6,pincode = $7, aadharcard = $8,country = $9, joiningdate = $10,state = $11, status = $12, city = $13,gender = $14,profile_image = $15 WHERE id = $16";
      await client.query(query, [
        user.firstname,
        user.lastname,
        user.email,
        user.phonenumber,
        user.address,
        user.dob,
        user.pincode,
        user.aadharcard,
        user.country,
        user.joiningdate,
        user.state,
        user.status,
        user.city,
        user.gender,
        user.profile_image,
        user.id,
      ]);
    }
  } catch (error) {
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
//   { name: "id",type:"SERIAL PRIMARY KEY"},
//   { name: "gymOwnerId",type: "INTEGER NOT NULL"},
//   { name: "firstname",type: "VARCHAR(100) NOT NULL"},
//   { name: "lastname",type: "VARCHAR(100) NOT NULL"},
//   { name: "aadharcard",type: "VARCHAR(12) NOT NULL"},
//   { name: "dob",type: "DATE NOT NULL"},
//   { name: "address",type: "VARCHAR(255) NOT NULL"},
//   { name: "email",type: "VARCHAR(50) NOT NULL"},
//   { name: "password",type: "VARCHAR(255) NOT NULL"},
//   { name: "phonenumber",type: "VARCHAR(10) NOT NULL"},
//   { name: "pincode",type: "VARCHAR(6) NOT NULL"},
//   { name: "city",type: "VARCHAR(50) NOT NULL"},
//   { name: "state",type: "VARCHAR(50) NOT NULL"},
//   { name: "country",type: "VARCHAR(50) NOT NULL"},
//   { name: "status",type: "VARCHAR(15) NOT NULL"},
//   { name: "extentMembership",type: "Integer NOT NULL"},
//   { name: "discount",type: "DECIMAL(10,2) NOT NULL"},
//   { name: "receiptNumber",type: "VARCHAR(30) NOT NULL"},
//   { name: "gender",type: "VARCHAR(10) NOT NULL"},
//   { name: "joiningdate",type:"DATE NOT NULL"},
//   { name: "groups",type: "VARCHAR(10) NOT NULL"},
//   { name: "startdate",type:"DATE NOT NULL"},
//   { name: "enddate",type:"DATE NOT NULL"},
//   { name: "plan",type: "VARCHAR(20) NOT NULL"},
//   { name: "duration",type: "Integer NOT NULL"},
//   { name: "planPrice",type: "DECIMAL(10,2) NOT NULL"},
//   { name: "totalAmount",type:"DECIMAL(10,2) NOT NULL"},
//   { name: "amountPaid",type:"DECIMAL(10, 2) NOT NULL"},
//   { name: "balanceAmount",type:"DECIMAL(10, 2) NOT NULL"},
//   { name: "modeOfPayment",type:"VARCHAR(20) NOT NULL"},
//   { name: "ProfileImage",type:"BYTEA NOT NULL"},
//   { name: "otp", type: "VARCHAR(8)" },
//   { name: "isVerified", type: "BOOLEAN" },
//   { name: "role", type: "VARCHAR(15)" },
//   { name: "resetPasswordToken", type: "VARCHAR(500)" },
//   { name: "resetPasswordTokenExpire", type: "timestamptz" },
// ]

// createTable("trainee", columns);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validate = require("mongoose-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: validate({
      validator: "isLength",
      arguments: [3, 50],
      message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
    }),
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: validate({
      validator: "isEmail",
      message: "Please enter a valid email",
    }),
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    validate: validate({
      validator: "isLength",
      arguments: [10, 10],
      message: "Please enter a valid phone number",
    }),
  },
  avatar: {
    public_id: {
      type: String,
      default: crypto.randomBytes(4).toString("hex"),
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dk0o7tdks/image/upload/v1681134668/images/user_cl1ttq.jpg",
    },
  },
  address: {
    type: String,
    required: true,
    validate: validate({
      validator: "isLength",
      arguments: [3, 200],
      message: "Address should be between {ARGS[0]} and {ARGS[1]} characters",
    }),
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id + this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return this.resetPasswordToken;
};
module.exports = mongoose.model("User", UserSchema);

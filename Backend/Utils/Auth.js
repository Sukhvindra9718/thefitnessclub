const jwt = require("jsonwebtoken");
const CatchAsyncErrors = require("../Middlewares/CatchAsyncErrors");
const ErrorHandler = require("./ErrorHandler");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432, // Default PostgreSQL port
});
exports.authorizationGymOwner = () => {
    return async(req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
          return next(new ErrorHandler("Login first to access this resource", 401));
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await getUserFromDatabase(
      "email",
      decodedData.id.split(".com")[0] + ".com"
    );
      if (req.user.role !== "gymOwner") {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resource `,
            403
          )
        );
      }
  
      next();
    };
  };


exports.authorizationGymTrainee = () => {
    return async(req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
          return next(new ErrorHandler("Login first to access this resource", 401));
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await getUserFromDatabase(
      "email",
      decodedData.id.split(".com")[0] + ".com"
    );
      if (req.user.role !== "gymTrainee") {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resource `,
            403
          )
        );
      }
  
      next();
    };
  };

exports.authorizationGymTrainer = () => {
    return async(req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
          return next(new ErrorHandler("Login first to access this resource", 401));
      }
      console.log(token)
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await getUserFromDatabase(
      "email",
      decodedData.id.split(".com")[0] + ".com"
    );
      if (req.user.role !== "gymTrainer") {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resource `,
            403
          )
        );
      }
  
      next();
    };
  };
  

exports.authorizationAdmin = () => {
  return async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    console.log(token)
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await getUserFromDatabase(
    "email",
    decodedData.id.split(".com")[0] + ".com"
  );
    if (req.user.role !== "gymOwner") {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }

    next();
  };
};

exports.Authentication = CatchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await getUserFromDatabase(
    "email",
    decodedData.id.split(".com")[0] + ".com"
  );
  next();
});

const getUserFromDatabase = async (findById, value) => {
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

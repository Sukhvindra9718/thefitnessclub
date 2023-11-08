const { Pool, Client } = require('pg');


const connectDB = async () => {
  // Create a PostgreSQL pool (recommended for production)
  const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432, // Default PostgreSQL port
  });

  pool
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
      // You can execute database queries here
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });

  // pool.end();
};

module.exports = connectDB;

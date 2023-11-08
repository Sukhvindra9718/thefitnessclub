const { Pool } = require("pg");
const CatchAsyncErrors = require("../Middlewares/CatchAsyncErrors");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432, // Default PostgreSQL port
  });

exports.createTable = CatchAsyncErrors(async (tableName, columns) => {
  const client = await pool.connect();
  try {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
              ${columns
                .map((column) => `${column.name} ${column.type}`)
                .join(", ")}
            );
          `;
    await client.query(createTableQuery);
    console.log(`Table "${tableName}" created successfully.`);
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    client.release(); // Release the client back to the pool
    pool.end(); // Close the pool when done
  }
});

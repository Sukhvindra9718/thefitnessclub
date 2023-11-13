const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432, // Default PostgreSQL port
  });
  
exports.getImage = async (req, res) => {
    const userId = req.params.userId; // Get the user ID from the request parameters
    console.log(userId)
    try {
      const result = await pool.query('SELECT profile_image FROM users WHERE id = $1', [userId]);
  
      if (result.rows.length > 0) {
        const profileImageBuffer = result.rows[0].profile_image;
  
        res.writeHead(200, {
          'Content-Type': 'image/jpeg', // Adjust based on your image format
          'Content-Length': profileImageBuffer.length,
        });
  
        res.end(profileImageBuffer);
      } else {
        res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
const { Pool } = require('pg');

// PostgreSQL connection configuration
// Supports both local development and Vercel Postgres
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database and create users table
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');
  } catch (error) {
    console.error('Error creating users table:', error.message);
    // Don't throw in production to allow the app to continue
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
  }
};

// Initialize on module load
initializeDatabase().catch(console.error);

// Database helper functions
const dbHelpers = {
  // Get user by email
  getUserByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  // Get user by username
  getUserByUsername: async (username) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const result = await pool.query(
        'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw error;
    }
  },

  // Create new user
  createUser: async (username, email, hashedPassword, role = 'user') => {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
        [username, email, hashedPassword, role]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

// Graceful shutdown
const closePool = async () => {
  try {
    await pool.end();
    console.log('PostgreSQL pool closed');
  } catch (error) {
    console.error('Error closing PostgreSQL pool:', error);
  }
};

module.exports = { pool, dbHelpers, closePool };

import mysql from 'mysql2/promise';
import logger from '../utils/logger.js';

let pool = null;

// Create connection pool
export const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    // Parse DATABASE_URL
    const url = new URL(dbUrl);
    
    pool = mysql.createPool({
      host: url.hostname,
      port: url.port || 3306,
      user: url.username,
      password: decodeURIComponent(url.password),
      database: url.pathname.slice(1),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    connection.release();
    
    logger.info('✅ Database connected successfully');
    return pool;
  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

export const disconnectDB = async () => {
  if (pool) {
    await pool.end();
    logger.info('Database disconnected');
  }
};

export const getPool = () => pool;

// Query helper
export const query = async (sql, params = []) => {
  if (!pool) {
    throw new Error('Database not connected');
  }
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Transaction helper
export const transaction = async (callback) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default { connectDB, disconnectDB, getPool, query, transaction };

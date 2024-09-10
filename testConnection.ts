import { Pool } from 'pg';

const pool = new Pool({
  user: 'nathaly',
  host: 'localhost',
  database: 'timetracker',
  password: 'carjajeh12', 
  port: 5432,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connection successful');
    await client.release();
  } catch (err) {
    console.error('Connection error:', err);
  }
};

testConnection();


// /src/config/database.ts

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
  });

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

export default pool;

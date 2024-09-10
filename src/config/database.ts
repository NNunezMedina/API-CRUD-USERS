// /src/config/database.ts

import { Pool } from 'pg';

const pool = new Pool({
  user: 'nathaly', // tu nombre de usuario en PostgreSQL
  host: 'localhost', // el host donde está corriendo PostgreSQL
  database: 'timetracker', // el nombre de tu base de datos
  password: 'carjajeh12', // tu contraseña de PostgreSQL
  port: 5432, // el puerto por defecto de PostgreSQL
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

export default pool;

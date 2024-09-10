// /src/models/userModel.ts

import pool from '../config/database';

interface User {
  id: number;
  name: string;
  email: string;
  // Otros campos que tenga la tabla `users`
}

export const getUsers = async (): Promise<User[]> => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows.length ? res.rows[0] : null;
};

export const createUser = async (name: string, email: string, role: string, rate: number) => {
    const query = 'INSERT INTO users (name, email, role, rate) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, role, rate];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
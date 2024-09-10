import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUserById, createUser, deleteUser } from './models/userModel'; 
import { parse } from 'querystring';

const port = 3000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Ruta encontrada: Bienvenido al servidor Node.js con TypeScript');
  } else if (method === 'GET' && url === '/users') {
    try {
      const users = await getUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve users' }));
    }
  } else if (method === 'GET' && url?.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2], 10);
    try {
      const user = await getUserById(id);
      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    } catch (err) {
      console.error('Error retrieving user:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve user' }));
    }
  } else if (method === 'POST' && url === '/users') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', async () => {
      try {
        const parsedBody = JSON.parse(body);
        const { name, email, role, rate } = parsedBody;

        if (!name || !email || !role || !rate) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name, email, role, and rate are required' }));
          return;
        }

        const newUser = await createUser(name, email, role, rate);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (err) {
        console.error('Error creating user:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to create user' }));
      }
    });
  } else if (method === 'DELETE' && url?.startsWith('/users/')) {
    const id = parseInt(url.split('/')[2], 10);
    try {
      const result = await deleteUser(id);
      console.log('Delete Result:', result); // Agrega esto para verificar el resultado
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User deleted successfully' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to delete user' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

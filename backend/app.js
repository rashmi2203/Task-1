const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'rootpassword',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test API - Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
    res.status(201).json({ message: 'Product added', productId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Update an existing product by ID
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;
  try {
    const [result] = await pool.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, productId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Product updated' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


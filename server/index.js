const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const productsRoutes = require('./routes/products');
const calculatorRoutes = require('./routes/calculator');
const requestsRoutes = require('./routes/requests');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads directory for item inspection and customer photos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Static assets directory for consoles and CRT TV photos
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'public', 'assets')));
app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'src', 'assets')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Lion Games & TVs - Reverse E-Commerce Buyback Engine',
    market: 'Mexico (MXN)',
    timestamp: new Date().toISOString()
  });
});

// API Routes (Customer-facing services)
app.use('/api/products', productsRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/requests', requestsRoutes);

// If client production build exists, serve it
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    // Only forward non-api routes to index.html
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'Endpoint no encontrado' });
    }
  });
}

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎮 RetroCompra Full-Stack Server Running on Port ${PORT}`);
    console.log(`🇲🇽 Target Market: Mexico | Currency: MXN`);
    console.log(`💻 Web Application: http://localhost:${PORT}`);
    console.log(`⚡ API Endpoints: http://localhost:${PORT}/api`);
    console.log(`=======================================================`);
  });
}

module.exports = app;

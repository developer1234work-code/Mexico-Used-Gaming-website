const fs = require('fs');
const path = require('path');
const { seedUsers, seedProducts, seedSellRequests } = require('../data/seedData');

const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

class DatabaseAdapter {
  constructor() {
    this.data = {
      users: [],
      products: [],
      sellRequests: [],
      auditLogs: [],
      emailLogs: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        // Ensure collections exist
        ['users', 'products', 'sellRequests', 'auditLogs', 'emailLogs'].forEach((col) => {
          if (!Array.isArray(this.data[col])) {
            this.data[col] = [];
          }
        });
      } else {
        // Seed database
        this.data = {
          users: seedUsers,
          products: seedProducts,
          sellRequests: seedSellRequests,
          auditLogs: [
            {
              id: 'audit-001',
              action: 'SYSTEM_INIT',
              performedBy: 'System',
              target: 'Database',
              timestamp: new Date().toISOString(),
              details: 'Base de datos inicializada con productos y usuarios de prueba'
            }
          ],
          emailLogs: [
            {
              id: 'eml-001',
              to: 'roberto.garcia@example.com',
              subject: 'Confirmación de solicitud de venta - REQ-2026-8801 | Lion Games & TVs',
              type: 'CUSTOMER_SUBMISSION_CONFIRMATION',
              requestId: 'REQ-2026-8801',
              sentAt: new Date(Date.now() - 3600000 * 24).toISOString(),
              status: 'SENT'
            }
          ]
        };
        this.save();
      }
    } catch (err) {
      console.error('Error loading DB file:', err);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to DB file:', err);
    }
  }

  getCollection(name) {
    if (!this.data[name]) {
      this.data[name] = [];
    }
    return this.data[name];
  }

  find(collectionName, query = {}) {
    const col = this.getCollection(collectionName);
    return col.filter((item) => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findOne(collectionName, query = {}) {
    const col = this.getCollection(collectionName);
    return col.find((item) => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  findById(collectionName, id) {
    const col = this.getCollection(collectionName);
    return col.find((item) => item.id === id || item._id === id) || null;
  }

  insertOne(collectionName, document) {
    const col = this.getCollection(collectionName);
    const docWithDates = {
      ...document,
      createdAt: document.createdAt || new Date().toISOString(),
      updatedAt: document.updatedAt || new Date().toISOString()
    };
    col.push(docWithDates);
    this.save();
    return docWithDates;
  }

  findByIdAndUpdate(collectionName, id, updates) {
    const col = this.getCollection(collectionName);
    const index = col.findIndex((item) => item.id === id || item._id === id);
    if (index === -1) return null;

    col[index] = {
      ...col[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return col[index];
  }

  updateOne(collectionName, query, updates) {
    const item = this.findOne(collectionName, query);
    if (!item) return null;
    return this.findByIdAndUpdate(collectionName, item.id || item._id, updates);
  }

  deleteOne(collectionName, id) {
    const col = this.getCollection(collectionName);
    const index = col.findIndex((item) => item.id === id || item._id === id);
    if (index === -1) return false;
    col.splice(index, 1);
    this.save();
    return true;
  }

  countDocuments(collectionName, query = {}) {
    return this.find(collectionName, query).length;
  }
}

const db = new DatabaseAdapter();

module.exports = db;

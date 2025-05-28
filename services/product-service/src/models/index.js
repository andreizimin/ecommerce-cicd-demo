const dbConfig = require('../config/db.config.js')[process.env.NODE_ENV || 'development'];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.products = require('./product.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.inventory = require('./inventory.model.js')(sequelize, Sequelize);

// Define relationships
db.categories.hasMany(db.products, { foreignKey: 'category_id' });
db.products.belongsTo(db.categories, { foreignKey: 'category_id' });
db.products.hasOne(db.inventory, { foreignKey: 'product_id' });
db.inventory.belongsTo(db.products, { foreignKey: 'product_id' });

module.exports = db;

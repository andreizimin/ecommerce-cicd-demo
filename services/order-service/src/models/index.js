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
db.users = require('./user.model.js')(sequelize, Sequelize);
db.carts = require('./cart.model.js')(sequelize, Sequelize);
db.cartItems = require('./cartItem.model.js')(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);
db.orderItems = require('./orderItem.model.js')(sequelize, Sequelize);

// Define relationships
db.users.hasMany(db.carts, { foreignKey: 'user_id' });
db.carts.belongsTo(db.users, { foreignKey: 'user_id' });

db.carts.hasMany(db.cartItems, { foreignKey: 'cart_id' });
db.cartItems.belongsTo(db.carts, { foreignKey: 'cart_id' });

db.users.hasMany(db.orders, { foreignKey: 'user_id' });
db.orders.belongsTo(db.users, { foreignKey: 'user_id' });

db.orders.hasMany(db.orderItems, { foreignKey: 'order_id' });
db.orderItems.belongsTo(db.orders, { foreignKey: 'order_id' });

module.exports = db;

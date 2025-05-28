module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.STRING(36),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled'),
      defaultValue: 'Processing'
    },
    shipping_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shipping_address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shipping_city: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    shipping_state: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    shipping_zip: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'orders',
    timestamps: false
  });

  return Order;
};

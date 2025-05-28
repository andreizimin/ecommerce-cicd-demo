module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define("inventory", {
    product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'inventory',
    timestamps: false
  });

  return Inventory;
};

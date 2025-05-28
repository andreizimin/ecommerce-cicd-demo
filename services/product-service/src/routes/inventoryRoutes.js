const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Get inventory status for a product
router.get('/:productId', inventoryController.getInventoryStatus);

// Update inventory for a product (admin)
router.put('/:productId', inventoryController.updateInventory);

module.exports = router;

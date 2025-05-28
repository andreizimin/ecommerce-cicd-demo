const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Create new order
router.post('/', orderController.createOrder);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Create a new category (admin)
router.post('/', categoryController.createCategory);

// Update a category (admin)
router.put('/:id', categoryController.updateCategory);

// Delete a category (admin)
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

// Mock inventory data for development
let inventory = [
  {
    productId: 1,
    quantity: 50,
    updatedAt: new Date()
  },
  {
    productId: 2,
    quantity: 25,
    updatedAt: new Date()
  },
  {
    productId: 3,
    quantity: 100,
    updatedAt: new Date()
  },
  {
    productId: 4,
    quantity: 30,
    updatedAt: new Date()
  },
  {
    productId: 5,
    quantity: 75,
    updatedAt: new Date()
  },
  {
    productId: 6,
    quantity: 15,
    updatedAt: new Date()
  }
];

// Controller methods
exports.getInventoryStatus = (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const inventoryItem = inventory.find(item => item.productId === productId);
    
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory not found for this product' });
    }
    
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory status', error: error.message });
  }
};

exports.updateInventory = (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    
    if (quantity === undefined) {
      return res.status(400).json({ message: 'Quantity is required' });
    }
    
    const inventoryIndex = inventory.findIndex(item => item.productId === productId);
    
    if (inventoryIndex === -1) {
      // Create new inventory entry if it doesn't exist
      const newInventoryItem = {
        productId,
        quantity,
        updatedAt: new Date()
      };
      
      inventory.push(newInventoryItem);
      return res.status(201).json(newInventoryItem);
    }
    
    // Update existing inventory
    const updatedInventory = {
      ...inventory[inventoryIndex],
      quantity,
      updatedAt: new Date()
    };
    
    inventory[inventoryIndex] = updatedInventory;
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error: error.message });
  }
};

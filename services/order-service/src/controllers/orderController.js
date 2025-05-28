// Mock orders data for development
let orders = [
  {
    id: 'ORD-2025-001',
    userId: 'user123',
    items: [
      { productId: 1, name: 'Smartphone X', quantity: 1, price: 699.99 },
      { productId: 3, name: 'Wireless Headphones', quantity: 2, price: 149.99 }
    ],
    total: 1099.97,
    status: 'Delivered',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    createdAt: new Date('2025-05-25'),
    updatedAt: new Date('2025-05-25')
  },
  {
    id: 'ORD-2025-002',
    userId: 'user123',
    items: [
      { productId: 6, name: 'Tablet Ultra', quantity: 1, price: 499.99 },
      { productId: 5, name: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
    ],
    total: 579.98,
    status: 'Processing',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    createdAt: new Date('2025-05-27'),
    updatedAt: new Date('2025-05-27')
  }
];

// For demo purposes, we'll use a fixed user ID
const DEFAULT_USER_ID = 'user123';

// Helper function to check inventory with Product Service
const checkInventory = async (productId, quantity) => {
  try {
    // In a real application, this would make an HTTP request to the Product Service
    // For now, we'll mock the response
    const mockInventory = [
      { productId: 1, quantity: 50 },
      { productId: 2, quantity: 25 },
      { productId: 3, quantity: 100 },
      { productId: 4, quantity: 30 },
      { productId: 5, quantity: 75 },
      { productId: 6, quantity: 15 }
    ];
    
    const inventoryItem = mockInventory.find(item => item.productId === productId);
    
    if (!inventoryItem) {
      throw new Error('Product not found in inventory');
    }
    
    if (inventoryItem.quantity < quantity) {
      throw new Error('Insufficient inventory');
    }
    
    return true;
  } catch (error) {
    throw new Error(`Inventory check failed: ${error.message}`);
  }
};

// Helper function to update inventory with Product Service
const updateInventory = async (productId, quantity) => {
  try {
    // In a real application, this would make an HTTP request to the Product Service
    // For now, we'll just log the action
    console.log(`Updating inventory for product ${productId}, reducing by ${quantity}`);
    return true;
  } catch (error) {
    throw new Error(`Inventory update failed: ${error.message}`);
  }
};

// Controller methods
exports.getAllOrders = (req, res) => {
  try {
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Filter orders by user ID
    const userOrders = orders.filter(order => order.userId === userId);
    
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrderById = (req, res) => {
  try {
    const orderId = req.params.id;
    
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Find order by ID and user ID
    const order = orders.find(order => order.id === orderId && order.userId === userId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    if (!items || !items.length || !shippingAddress) {
      return res.status(400).json({ message: 'Items and shipping address are required' });
    }
    
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Check inventory for all items
    try {
      for (const item of items) {
        await checkInventory(item.productId, item.quantity);
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Generate order ID
    const orderId = `ORD-${new Date().getFullYear()}-${orders.length + 1}`.padEnd(10, '0');
    
    // Create new order
    const newOrder = {
      id: orderId,
      userId,
      items,
      total,
      status: 'Processing',
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Update inventory
    try {
      for (const item of items) {
        await updateInventory(item.productId, item.quantity);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    
    // Add order to database
    orders.push(newOrder);
    
    // Clear cart (in a real application)
    // await clearCart(userId);
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.updateOrderStatus = (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    // Find order by ID
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update order status
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();
    
    res.status(200).json(orders[orderIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

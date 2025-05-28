// Mock cart data for development
// In a real application, this would be stored in a database and associated with user sessions
let carts = {
  'user123': {
    items: [
      {
        id: 1,
        productId: 1,
        name: 'Smartphone X',
        price: 699.99,
        quantity: 1,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 2,
        productId: 3,
        name: 'Wireless Headphones',
        price: 149.99,
        quantity: 2,
        image: 'https://via.placeholder.com/100'
      }
    ],
    updatedAt: new Date()
  }
};

// For demo purposes, we'll use a fixed user ID
const DEFAULT_USER_ID = 'user123';

// Helper function to get product details from Product Service
const getProductDetails = async (productId) => {
  try {
    // In a real application, this would make an HTTP request to the Product Service
    // For now, we'll mock the response
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone X',
        price: 699.99,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 2,
        name: 'Laptop Pro',
        price: 1299.99,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 3,
        name: 'Wireless Headphones',
        price: 149.99,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 4,
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 6,
        name: 'Tablet Ultra',
        price: 499.99,
        image: 'https://via.placeholder.com/100'
      }
    ];
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  } catch (error) {
    throw new Error(`Error fetching product details: ${error.message}`);
  }
};

// Controller methods
exports.getCart = (req, res) => {
  try {
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Get or initialize cart
    const cart = carts[userId] || { items: [], updatedAt: new Date() };
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Get or initialize cart
    if (!carts[userId]) {
      carts[userId] = { items: [], updatedAt: new Date() };
    }
    
    // Check if product already exists in cart
    const existingItemIndex = carts[userId].items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      carts[userId].items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      try {
        const productDetails = await getProductDetails(productId);
        
        const newItem = {
          id: carts[userId].items.length + 1,
          productId,
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.image,
          quantity
        };
        
        carts[userId].items.push(newItem);
      } catch (error) {
        return res.status(404).json({ message: error.message });
      }
    }
    
    // Update timestamp
    carts[userId].updatedAt = new Date();
    
    res.status(200).json(carts[userId]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

exports.updateCartItem = (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body;
    
    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Check if cart exists
    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Find item in cart
    const itemIndex = carts[userId].items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Update item quantity
    carts[userId].items[itemIndex].quantity = quantity;
    carts[userId].updatedAt = new Date();
    
    res.status(200).json(carts[userId]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Check if cart exists
    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Remove item from cart
    carts[userId].items = carts[userId].items.filter(item => item.id !== itemId);
    carts[userId].updatedAt = new Date();
    
    res.status(200).json(carts[userId]);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

exports.clearCart = (req, res) => {
  try {
    // In a real application, we would get the user ID from authentication
    const userId = DEFAULT_USER_ID;
    
    // Check if cart exists
    if (!carts[userId]) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    // Clear cart
    carts[userId].items = [];
    carts[userId].updatedAt = new Date();
    
    res.status(200).json(carts[userId]);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};

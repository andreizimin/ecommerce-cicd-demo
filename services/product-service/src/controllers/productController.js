// Mock database for development
let products = [
  {
    id: 1,
    name: 'Smartphone X',
    price: 699.99,
    image: 'https://via.placeholder.com/300',
    description: 'Latest smartphone with advanced features',
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Laptop Pro',
    price: 1299.99,
    image: 'https://via.placeholder.com/300',
    description: 'High-performance laptop for professionals',
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
    description: 'Premium sound quality with noise cancellation',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://via.placeholder.com/300',
    description: 'Track your fitness and stay connected',
    categoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://via.placeholder.com/300',
    description: 'Portable speaker with rich sound',
    categoryId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    name: 'Tablet Ultra',
    price: 499.99,
    image: 'https://via.placeholder.com/300',
    description: 'Slim and powerful tablet for entertainment',
    categoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Controller methods
exports.getAllProducts = (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.createProduct = (req, res) => {
  try {
    const { name, price, image, description, categoryId } = req.body;
    
    if (!name || !price || !description || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      image: image || 'https://via.placeholder.com/300',
      description,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, image, description, categoryId } = req.body;
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const updatedProduct = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price || products[productIndex].price,
      image: image || products[productIndex].image,
      description: description || products[productIndex].description,
      categoryId: categoryId || products[productIndex].categoryId,
      updatedAt: new Date()
    };
    
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    products = products.filter(p => p.id !== id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

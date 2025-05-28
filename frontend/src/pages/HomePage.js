import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for demonstration purposes
  useEffect(() => {
    // This would normally fetch from the Product/Inventory service
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone X',
        price: 699.99,
        image: 'https://via.placeholder.com/300',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Laptop Pro',
        price: 1299.99,
        image: 'https://via.placeholder.com/300',
        description: 'High-performance laptop for professionals',
        category: 'Electronics'
      },
      {
        id: 3,
        name: 'Wireless Headphones',
        price: 149.99,
        image: 'https://via.placeholder.com/300',
        description: 'Premium sound quality with noise cancellation',
        category: 'Audio'
      },
      {
        id: 4,
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://via.placeholder.com/300',
        description: 'Track your fitness and stay connected',
        category: 'Wearables'
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://via.placeholder.com/300',
        description: 'Portable speaker with rich sound',
        category: 'Audio'
      },
      {
        id: 6,
        name: 'Tablet Ultra',
        price: 499.99,
        image: 'https://via.placeholder.com/300',
        description: 'Slim and powerful tablet for entertainment',
        category: 'Electronics'
      }
    ];
    
    setProducts(mockProducts);
    setLoading(false);
  }, []);
  
  const addToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // This would normally call the Order/Cart service
    alert(`Product added to cart!`);
  };
  
  return (
    <div>
      <h1 className="mb-4">Product Catalog</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      as={Link} 
                      to={`/product/${product.id}`} 
                      variant="primary"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;

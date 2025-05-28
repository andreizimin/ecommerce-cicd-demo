import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, ListGroup, Image } from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would normally fetch from the Product/Inventory service
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone X',
        price: 699.99,
        image: 'https://via.placeholder.com/500',
        description: 'Latest smartphone with advanced features',
        category: 'Electronics',
        details: [
          '6.5-inch OLED display',
          '128GB storage',
          '12MP dual camera',
          'All-day battery life',
          'Water resistant'
        ]
      },
      {
        id: 2,
        name: 'Laptop Pro',
        price: 1299.99,
        image: 'https://via.placeholder.com/500',
        description: 'High-performance laptop for professionals',
        category: 'Electronics',
        details: [
          '15.6-inch 4K display',
          '16GB RAM',
          '512GB SSD',
          'Dedicated graphics',
          'Backlit keyboard'
        ]
      },
      {
        id: 3,
        name: 'Wireless Headphones',
        price: 149.99,
        image: 'https://via.placeholder.com/500',
        description: 'Premium sound quality with noise cancellation',
        category: 'Audio',
        details: [
          'Active noise cancellation',
          '30-hour battery life',
          'Bluetooth 5.0',
          'Built-in microphone',
          'Foldable design'
        ]
      },
      {
        id: 4,
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://via.placeholder.com/500',
        description: 'Track your fitness and stay connected',
        category: 'Wearables',
        details: [
          'Heart rate monitoring',
          'GPS tracking',
          'Water resistant',
          '7-day battery life',
          'Customizable watch faces'
        ]
      },
      {
        id: 5,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://via.placeholder.com/500',
        description: 'Portable speaker with rich sound',
        category: 'Audio',
        details: [
          '360° sound',
          'Waterproof',
          '12-hour battery life',
          'Built-in microphone',
          'Compact design'
        ]
      },
      {
        id: 6,
        name: 'Tablet Ultra',
        price: 499.99,
        image: 'https://via.placeholder.com/500',
        description: 'Slim and powerful tablet for entertainment',
        category: 'Electronics',
        details: [
          '10.9-inch Retina display',
          '64GB storage',
          '12MP camera',
          'Stereo speakers',
          'All-day battery life'
        ]
      }
    ];
    
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);
  
  const addToCart = () => {
    console.log(`Added product ${id} to cart`);
    // This would normally call the Order/Cart service
    alert(`Product added to cart!`);
    navigate('/cart');
  };
  
  if (loading) {
    return <p>Loading product details...</p>;
  }
  
  if (!product) {
    return <p>Product not found</p>;
  }
  
  return (
    <div>
      <Button 
        variant="secondary" 
        onClick={() => navigate('/')}
        className="mb-3"
      >
        Back to Products
      </Button>
      
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">{product.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Category: {product.category}
              </Card.Subtitle>
              <Card.Text as="h3" className="text-primary">
                ${product.price.toFixed(2)}
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
              
              <h4>Product Details</h4>
              <ListGroup variant="flush" className="mb-3">
                {product.details.map((detail, index) => (
                  <ListGroup.Item key={index}>{detail}</ListGroup.Item>
                ))}
              </ListGroup>
              
              <Button 
                variant="success" 
                size="lg" 
                onClick={addToCart}
                className="w-100"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;

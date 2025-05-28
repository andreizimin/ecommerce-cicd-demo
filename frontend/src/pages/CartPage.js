import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would normally fetch from the Order/Cart service
    const mockCartItems = [
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
    ];
    
    setCartItems(mockCartItems);
    setLoading(false);
  }, []);
  
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  if (loading) {
    return <p>Loading cart...</p>;
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Button as={Link} to="/" variant="primary" size="lg" className="mt-3">
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="mb-4">Shopping Cart</h1>
      
      <Row>
        <Col md={8}>
          <Table responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '50px', marginRight: '10px' }} 
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header as="h5">Order Summary</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${(calculateTotal() * 1.1).toFixed(2)}</strong>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                className="w-100"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
          
          <Button 
            as={Link} 
            to="/" 
            variant="outline-primary" 
            className="w-100 mt-3"
          >
            Continue Shopping
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;

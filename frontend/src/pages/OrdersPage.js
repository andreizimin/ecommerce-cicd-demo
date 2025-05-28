import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This would normally fetch from the Order/Cart service
    const mockOrders = [
      {
        id: 'ORD-2025-001',
        date: '2025-05-25',
        total: 1099.97,
        status: 'Delivered',
        items: [
          { name: 'Smartphone X', quantity: 1, price: 699.99 },
          { name: 'Wireless Headphones', quantity: 2, price: 149.99 }
        ]
      },
      {
        id: 'ORD-2025-002',
        date: '2025-05-27',
        total: 579.98,
        status: 'Processing',
        items: [
          { name: 'Tablet Ultra', quantity: 1, price: 499.99 },
          { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
        ]
      }
    ];
    
    setOrders(mockOrders);
    setLoading(false);
  }, []);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge bg="success">Delivered</Badge>;
      case 'Processing':
        return <Badge bg="warning">Processing</Badge>;
      case 'Shipped':
        return <Badge bg="info">Shipped</Badge>;
      case 'Cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  if (loading) {
    return <p>Loading orders...</p>;
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <h1>No Orders Found</h1>
        <p>You haven't placed any orders yet.</p>
        <Button as={Link} to="/" variant="primary" size="lg" className="mt-3">
          Start Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="mb-4">Order History</h1>
      
      {orders.map(order => (
        <Card key={order.id} className="mb-4">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Order #{order.id}</h5>
                <small className="text-muted">Placed on {new Date(order.date).toLocaleDateString()}</small>
              </div>
              <div>
                {getStatusBadge(order.status)}
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                  <td><strong>${order.total.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </Table>
            
            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-primary" size="sm">
                Track Order
              </Button>
              <Button variant="outline-secondary" size="sm">
                View Details
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      
      <div className="text-center mt-4">
        <Button as={Link} to="/" variant="primary">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrdersPage;

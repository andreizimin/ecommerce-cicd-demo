-- Initialize database with sample data for E-Commerce CI/CD Demo Application

USE ecommerce_demo;

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Audio', 'Audio equipment and accessories'),
('Wearables', 'Wearable technology and accessories');

-- Insert sample products
INSERT INTO products (name, price, image, description, category_id) VALUES
('Smartphone X', 699.99, 'https://via.placeholder.com/300', 'Latest smartphone with advanced features', 1),
('Laptop Pro', 1299.99, 'https://via.placeholder.com/300', 'High-performance laptop for professionals', 1),
('Wireless Headphones', 149.99, 'https://via.placeholder.com/300', 'Premium sound quality with noise cancellation', 2),
('Smart Watch', 249.99, 'https://via.placeholder.com/300', 'Track your fitness and stay connected', 3),
('Bluetooth Speaker', 79.99, 'https://via.placeholder.com/300', 'Portable speaker with rich sound', 2),
('Tablet Ultra', 499.99, 'https://via.placeholder.com/300', 'Slim and powerful tablet for entertainment', 1);

-- Insert sample inventory
INSERT INTO inventory (product_id, quantity) VALUES
(1, 50),
(2, 25),
(3, 100),
(4, 30),
(5, 75),
(6, 15);

-- Insert sample user
INSERT INTO users (id, email, name) VALUES
('user123', 'user@example.com', 'John Doe');

-- Insert sample cart
INSERT INTO carts (user_id) VALUES
('user123');

-- Get the cart ID
SET @cart_id = LAST_INSERT_ID();

-- Insert sample cart items
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(@cart_id, 1, 1),
(@cart_id, 3, 2);

-- Insert sample orders
INSERT INTO orders (id, user_id, total, status, shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip) VALUES
('ORD-2025-001', 'user123', 1099.97, 'Delivered', 'John Doe', '123 Main St', 'Anytown', 'CA', '12345'),
('ORD-2025-002', 'user123', 579.98, 'Processing', 'John Doe', '123 Main St', 'Anytown', 'CA', '12345');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES
('ORD-2025-001', 1, 'Smartphone X', 699.99, 1),
('ORD-2025-001', 3, 'Wireless Headphones', 149.99, 2),
('ORD-2025-002', 6, 'Tablet Ultra', 499.99, 1),
('ORD-2025-002', 5, 'Bluetooth Speaker', 79.99, 1);

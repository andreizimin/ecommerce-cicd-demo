# E-Commerce CI/CD Demo Application Architecture

## Overview

This document outlines the architecture for a sample e-commerce application designed to demonstrate CI/CD capabilities. The application consists of a React frontend, two backend microservices, and a MySQL database, all containerized with Docker and deployable with Kubernetes.

## System Components

### 1. Frontend Application

- **Technology**: React.js
- **Description**: A simple web interface for browsing products, managing cart, and placing orders
- **Key Features**:
  - Product catalog browsing
  - Shopping cart management
  - Checkout process
  - Order history viewing
- **Container**: Nginx serving static React build files

### 2. Backend Microservices

#### 2.1 Product/Inventory Service

- **Technology**: Node.js/Express
- **Description**: Manages product catalog and inventory information
- **Key Responsibilities**:
  - Product CRUD operations
  - Inventory management
  - Product search and filtering
  - Category management
- **API Endpoints**:
  - `GET /api/products` - List all products
  - `GET /api/products/:id` - Get product details
  - `GET /api/categories` - List all categories
  - `POST /api/products` - Add new product (admin)
  - `PUT /api/products/:id` - Update product (admin)
  - `DELETE /api/products/:id` - Delete product (admin)
  - `GET /api/inventory/:productId` - Check inventory status

#### 2.2 Order/Cart Service

- **Technology**: Node.js/Express
- **Description**: Handles shopping cart and order processing
- **Key Responsibilities**:
  - Shopping cart management
  - Order processing
  - Order history
  - Checkout flow
- **API Endpoints**:
  - `GET /api/cart` - Get cart contents
  - `POST /api/cart` - Add item to cart
  - `PUT /api/cart/:itemId` - Update cart item
  - `DELETE /api/cart/:itemId` - Remove item from cart
  - `POST /api/orders` - Create new order
  - `GET /api/orders` - Get order history
  - `GET /api/orders/:id` - Get order details

### 3. Database

- **Technology**: MySQL
- **Description**: Relational database storing all application data
- **Key Tables**:
  - `products` - Product information
  - `categories` - Product categories
  - `inventory` - Inventory levels
  - `users` - User information
  - `carts` - Shopping cart data
  - `cart_items` - Items in shopping carts
  - `orders` - Order information
  - `order_items` - Items in orders

## System Interactions

### Data Flow

1. **Product Browsing Flow**:
   - Frontend requests product data from Product/Inventory Service
   - Product/Inventory Service queries database and returns product information
   - Frontend displays products to user

2. **Cart Management Flow**:
   - Frontend sends cart updates to Order/Cart Service
   - Order/Cart Service stores cart information in database
   - Frontend retrieves updated cart from Order/Cart Service

3. **Checkout Flow**:
   - Frontend submits order request to Order/Cart Service
   - Order/Cart Service validates with Product/Inventory Service
   - Order/Cart Service creates order in database
   - Product/Inventory Service updates inventory levels
   - Order confirmation returned to Frontend

### Service Communication

- RESTful API calls between Frontend and Backend services
- Internal API calls between microservices
- Database connections from each microservice to MySQL

## Deployment Architecture

### Docker Containerization

- **Frontend Container**: Nginx serving React static files
- **Product/Inventory Service Container**: Node.js application
- **Order/Cart Service Container**: Node.js application
- **Database Container**: MySQL

### Kubernetes Deployment

- **Deployments**:
  - Frontend Deployment
  - Product/Inventory Service Deployment
  - Order/Cart Service Deployment
  - MySQL StatefulSet
- **Services**:
  - Frontend Service (LoadBalancer)
  - Product/Inventory Service (ClusterIP)
  - Order/Cart Service (ClusterIP)
  - MySQL Service (ClusterIP)
- **ConfigMaps/Secrets**:
  - Database credentials
  - Service configuration
- **Persistent Volumes**:
  - MySQL data storage

## Directory Structure

```
ecommerce-cicd-demo/
├── frontend/                  # React frontend application
│   ├── public/                # Static files
│   ├── src/                   # React source code
│   ├── Dockerfile             # Frontend container definition
│   └── package.json           # Frontend dependencies
├── services/
│   ├── product-service/       # Product/Inventory microservice
│   │   ├── src/               # Service source code
│   │   ├── Dockerfile         # Service container definition
│   │   └── package.json       # Service dependencies
│   └── order-service/         # Order/Cart microservice
│       ├── src/               # Service source code
│       ├── Dockerfile         # Service container definition
│       └── package.json       # Service dependencies
├── database/
│   ├── init/                  # Database initialization scripts
│   └── schema/                # Database schema definitions
├── kubernetes/                # Kubernetes deployment manifests
│   ├── frontend/              # Frontend deployment files
│   ├── product-service/       # Product service deployment files
│   ├── order-service/         # Order service deployment files
│   └── mysql/                 # Database deployment files
├── docker-compose.yml         # Local development setup
└── README.md                  # Project documentation
```

## Development and Deployment Workflow

1. **Local Development**:
   - Use Docker Compose to run all services locally
   - Each component can be developed independently

2. **CI/CD Pipeline** (to be configured separately):
   - Code pushed to repository
   - Automated tests run
   - Docker images built and tagged
   - Images pushed to container registry
   - Kubernetes manifests applied to target environment

3. **Environment Deployment**:
   - Dev: Development environment for ongoing work
   - Test: Testing and QA environment
   - Prod: Production environment

This architecture provides a complete sample application that demonstrates modern microservices patterns, containerization, and is ready for CI/CD pipeline integration.

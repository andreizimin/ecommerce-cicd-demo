# E-Commerce CI/CD Demo Application

A sample e-commerce application designed to demonstrate CI/CD capabilities. This application includes a React frontend, two backend microservices, and a MySQL database, all containerized with Docker and deployable with Kubernetes.

## Architecture Overview

This application follows a microservices architecture:

- **Frontend**: React application for product browsing, cart management, and checkout
- **Backend Microservices**:
  - **Product/Inventory Service**: Manages product catalog and inventory
  - **Order/Cart Service**: Handles shopping cart and order processing
- **Database**: MySQL for persistent storage

## Directory Structure

```
ecommerce-cicd-demo/
├── frontend/                  # React frontend application
│   ├── public/                # Static files
│   ├── src/                   # React source code
│   ├── Dockerfile             # Frontend container definition
│   └── nginx.conf             # Nginx configuration for the frontend
├── services/
│   ├── product-service/       # Product/Inventory microservice
│   │   ├── src/               # Service source code
│   │   └── Dockerfile         # Service container definition
│   └── order-service/         # Order/Cart microservice
│       ├── src/               # Service source code
│       └── Dockerfile         # Service container definition
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

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (for production deployment)
- Node.js and npm (for local development)

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ecommerce-cicd-demo
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost
   - Product Service API: http://localhost:3001
   - Order Service API: http://localhost:3002

### Kubernetes Deployment

1. Update the image registry in Kubernetes manifests:
   ```
   # Replace ${REGISTRY} and ${TAG} with your container registry and image tag
   sed -i 's/${REGISTRY}/your-registry/g' kubernetes/**/*.yaml
   sed -i 's/${TAG}/latest/g' kubernetes/**/*.yaml
   ```

2. Apply the Kubernetes manifests:
   ```
   kubectl apply -f kubernetes/mysql/
   kubectl apply -f kubernetes/product-service/
   kubectl apply -f kubernetes/order-service/
   kubectl apply -f kubernetes/frontend/
   ```

## CI/CD Demonstration

This application is designed to showcase CI/CD capabilities across different environments:

### Development Environment
- Feature branches deploy to isolated development environments
- Automated tests run on each commit
- Database migrations are applied automatically

### Testing Environment
- Merged code deploys to a shared testing environment
- Integration tests run against the full application
- QA can verify features before production

### Production Environment
- Approved changes deploy to production
- Blue/green deployment strategy for zero downtime
- Monitoring and alerting in place

## API Documentation

### Product Service

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - List all categories
- `POST /api/products` - Add new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/inventory/:productId` - Check inventory status

### Order Service

- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get order history
- `GET /api/orders/:id` - Get order details

## License

This project is licensed under the MIT License - see the LICENSE file for details.

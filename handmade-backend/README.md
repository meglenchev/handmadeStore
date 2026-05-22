# Handmade E-commerce Server (Node.js & Express)

## To-Do List

### Phase 1: Environment & Server Setup

- [x] Initialize Node.js project (`type: "module"`)
- [x] Set up basic Express server
- [ ] Configure environment variables (`.dotenv`) and CORS
- [ ] Connect server to MongoDB via Mongoose

### Phase 2: Database Modeling & Seeding

- [ ] Create `Product` Schema matching frontend data structure
- [ ] Create a Seed script to populate the database with initial products
- [ ] Create `Order` Schema for checkout flow

### Phase 3: API Architecture (Routes & Controllers)

- [ ] Implement `GET /api/products` (Fetch all products)
- [ ] Implement `GET /api/products/:id` (Fetch single product details)
- [ ] Implement `POST /api/orders` (Submit new order & decrease stock)
- [ ] Implement product search and category filtering endpoint

### Phase 4: Integration & Security

- [ ] Connect React frontend with the live API endpoints
- [ ] Add basic request validation
- [ ] Implement error handling middleware

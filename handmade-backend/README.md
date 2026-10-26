# Handmade E-commerce Server (Node.js & Express)

## To-Do List

### High priority

- [x] Finish the `Order` model - import `mongoose` (only `Schema` is imported), define the `arrayLimit` validator, rename `shoppingAddress` → `shippingAddress`
- [ ] Implement `POST /orders` (submit new order & decrease stock - use a transaction / atomic `$inc` with `stock >= qty` check)
- [x] Search: sanitize and escape user input before building the `RegExp` in `getSearchResults` (both `query` and `category`) _(`query` is escaped with `escapeRegex` and matched against `title` only; `category` is an exact-match filter, not a `RegExp`)_
- [x] Seed script for local setup: seed a vendor user, generate slugs in the script, document `MONGODB_URI` in `.env.example` and the root README

### Planned

- [ ] Vendor layer: `vendorController` + route group - apply to become a vendor, admin approval of `vendorStatus`, vendor product management
- [ ] Product create/update/delete for vendors - use `saveWithUniqueSlug(doc)` instead of `product.save()`; `productServices.create` must set `vendor` (it currently sets `ownerId`, which is not in the schema)
- [ ] Implement `GET /users/account/orders` for the account Orders tab (frontend already calls it)

### Phase 1: Environment & Server Setup

- [x] Initialize Node.js project (`type: "module"`)
- [x] Set up basic Express server
- [x] Configure environment variables (`.dotenv`) and CORS
- [x] Connect server to MongoDB via Mongoose

### Phase 2: Database Modeling & Seeding

- [x] Create `Product` Schema matching frontend data structure
- [x] Create a Seed script to populate the database with initial users and products
- [x] Create `Order` Schema for checkout flow _(to be finished - see High priority)_
- [x] Create `User` Schema with roles, `vendorStatus`, phone and embedded addresses (max 2)

### Phase 3: API Architecture (Routes & Controllers)

- [x] Implement `GET /products` (Fetch all products, with tag / category / price / sort filters)
- [x] Implement `GET /products/:id/details` (Fetch single product details)
- [x] Implement product search and category filtering endpoint (`/products/search`, `/products/categories`)
- [x] Implement auth endpoints: register, login, logout, `GET /users/me` (JWT in httpOnly cookie)
- [x] Implement account endpoints: `GET/POST /users/account/address`, `GET /users/account/details`
- [x] Implement `PATCH /users/account/address/:addressId`
- [x] Implement `PATCH /users/account/details` (username / full name) and `PATCH /users/account/password` (with current-password check)
- [ ] Implement `DELETE /users/account/address/:addressId` and "set as default"
- [ ] Allow changing the email address in account details

### Phase 4: Integration & Security

- [x] Connect React frontend with the live API endpoints (products, auth, account)
- [x] Implement error handling middleware (`errorHandler.js`)
- [x] Whitelist allowed fields instead of passing raw `req.body`
- [x] Search input is escaped (`escapeRegex`) against regex errors and ReDoS
- [x] Real logout / token invalidation (`jti` denylist in `revoked_tokens` with a TTL index)
- [ ] Revoke the current token on password change (`revokeToken`); other sessions of the user stay valid until they expire

#### ToDo

- [x] Add Vendor on Product Model when entering auth

### Login rate limiting (before production deploy)

- [ ] **Login rate limiting**
    - Limit failed login attempts per IP (e.g. 30 per 15 min) and per email (e.g. 10 per 15 min)
    - Count only failed attempts (401 responses); a successful login resets the email counter
    - When the limit is exceeded: respond with 429 and a `Retry-After` header
    - Use temporary throttling, not permanent account lockout
    - Add a separate, simpler limit for registration (e.g. 10 per hour per IP)
    - Behind a reverse proxy: set `app.set("trust proxy", 1)` so `req.ip` is the real client IP
    - If running multiple server instances: store counters in a shared store (e.g. MongoDB with a TTL index)

### Maintenance

- [ ] Rewrite the `Product` pre-hooks (`pre("save")` and `pre(["updateOne", "findOneAndUpdate"])`) as plain `async` functions without `next` - Mongoose 9 no longer passes it (like in `User.js`)
- [ ] `userServices.updateUserDetails` calls `httpError`, which is not defined - use the same `Error` + `statusCode` pattern as the other services
- [ ] Move `app.get("/")` in `index.js` before `routes` (it is registered after the `/*splat` 404 handler) or remove it
- [ ] Exit with `process.exit(1)` on DB connection failure (currently exits with code `0`)
- [x] Allow `PATCH` in the CORS `methods`
- [x] `toUserDetails` reads `fullName` from the user document

### Refactoring

- [ ] Move hardcoded values to `.env`: Mongo URL in `index.js` (use `MONGODB_URI` like `seed.js`), port `5000`, CORS origin `http://localhost:5173`, JWT expiry
- [x] Add a `.env.example`
- [ ] Migrate `productController` to `next(err)` + `errorHandler` (handle `CastError` → 400 centrally) and remove the outdated `TODO(refactor)` comment in `userController`
- [x] Build a whitelisted payload from the destructured address fields in `POST /users/account/address`
- [ ] Remove the unused `getBestSellers` service or expose it via an endpoint; remove the leftover `try { ... } catch (err) { throw err; }` in `register`
- [ ] Add a `/api` prefix to all routes
- [x] Root `README.md`: correct backend folder name (`handmade-backend`), document `npm run seed` and the required `.env` variables

### Final touches

- [ ] Add rate limiting on `/users/login` and `/users/register`
- [ ] Add `helmet` and a request body size limit
- [ ] Add backend tests (services + routes with `supertest` and an in-memory MongoDB)

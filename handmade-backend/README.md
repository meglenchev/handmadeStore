# Handmade E-commerce Server (Node.js & Express)

## To-Do List

### Phase 1: Environment & Server Setup

- [x] Initialize Node.js project (`type: "module"`)
- [x] Set up basic Express server
- [x] Configure environment variables (`.dotenv`) and CORS
- [x] Connect server to MongoDB via Mongoose

### Phase 2: Database Modeling & Seeding

- [x] Create `Product` Schema matching frontend data structure
- [x] Create a Seed script to populate the database with initial products _(currently broken — see Bugs)_
- [x] Create `Order` Schema for checkout flow _(file does not load yet — see Bugs)_
- [x] Create `User` Schema with roles, `vendorStatus`, phone and embedded addresses (max 2)

### Phase 3: API Architecture (Routes & Controllers)

- [x] Implement `GET /products` (Fetch all products, with tag / category / price / sort filters)
- [x] Implement `GET /products/:id/details` (Fetch single product details)
- [x] Implement product search and category filtering endpoint (`/products/search`, `/products/categories`)
- [x] Implement auth endpoints: register, login, logout, `GET /users/me` (JWT in httpOnly cookie)
- [x] Implement account endpoints: `GET/POST /users/account/address`, `GET /users/account/details`
- [ ] Implement `POST /orders` (Submit new order & decrease stock — use a transaction / atomic `$inc` with `stock >= qty` check)
- [ ] Implement `GET /users/account/orders` (frontend already calls it from the Orders tab)
- [ ] Implement `PATCH /users/account/address/:addressId` (frontend edit form already calls it)
- [ ] Implement `DELETE /users/account/address/:addressId` and "set as default"
- [ ] Implement `PUT /users/account/details` (username / email / password change with current-password check)
- [ ] Product create/update/delete for vendors — use `saveWithUniqueSlug(doc)` instead of `product.save()`

### Phase 4: Integration & Security

- [x] Connect React frontend with the live API endpoints (products, auth, account)
- [x] Implement error handling middleware (`errorHandler.js`)
- [ ] Add basic request validation (whitelist allowed fields instead of passing raw `req.body`)
- [ ] Real logout / token invalidation (token blacklist or refresh-token rotation)

#### ToDo

- [x] Add Vendor on Product Model when entering auth

### Bugs

- [ ] **Seed script fails** — `Product.vendor` is `required`, but `data/products.js` has no `vendor`; also `insertMany` skips the `pre("save")` hook, so every `slug` is `null` and the unique index throws E11000 after the first product. Seed a vendor user first and generate slugs in the script.
- [ ] **`Product` pre-hooks crash on Mongoose 9** — `pre("save")` and `pre(["updateOne", "findOneAndUpdate"])` call `next()`, which Mongoose 9 no longer passes (`next is not a function`). Rewrite them as plain `async` functions without `next` (like in `User.js`).
- [ ] **`models/Order.js` cannot be imported** — `mongoose` is not imported (only `Schema`), and `arrayLimit` is not defined. Also rename `shoppingAddress` → `shippingAddress`.
- [ ] **Search crashes on special characters** — `new RegExp(cleanQuery)` uses raw user input; a query like `(` returns 500 and long patterns allow ReDoS. Escape the input (also for `category`).
- [ ] **CORS does not allow `PATCH`** — the address edit form sends `PATCH`, the preflight will be rejected. Add it to `methods`.
- [ ] `app.get("/")` in `index.js` is registered after the `/*splat` 404 handler, so it is unreachable — move it before `routes` or remove it.
- [ ] `process.exit()` on DB connection failure exits with code `0` — use `process.exit(1)`.
- [ ] `toUserDetails` takes `fullName` from `address[0]` instead of the default address (`isDefault: true`).

### Refactoring

- [ ] Move hardcoded values to `.env`: Mongo URL (duplicated in `index.js` and `seed.js`), port `5000`, CORS origin `http://localhost:5173`, JWT expiry. Add a `.env.example`.
- [ ] Migrate `productController` to `next(err)` + `errorHandler` (handle `CastError` → 400 centrally) and remove the outdated `TODO(refactor)` comment in `userController`.
- [ ] Remove the unused destructuring of address fields in `POST /users/account/address` — use it to build a whitelisted payload instead of `req.body`.
- [ ] Remove the unused `getBestSellers` service or expose it via an endpoint; remove the leftover `try { ... } catch (err) { throw err; }` in `register`.
- [ ] Add a `/api` prefix to all routes (README/frontend currently mix both conventions).
- [ ] Fix root `README.md` — it references `handmade-server`, the folder is `handmade-backend`; document `npm run seed` and the required `.env` variables.

### Final touches

- [ ] Add rate limiting on `/users/login` and `/users/register`
- [ ] Add `helmet` and a request body size limit
- [ ] Add backend tests (services + routes with `supertest` and an in-memory MongoDB)

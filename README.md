# Handmade E-commerce Project

This application is split into two parts:

1. **[/handmade-store](./handmade-store)** - Client side (React + Vite)
2. **[/handmade-backend](./handmade-backend)** - Server side (Node.js + Express + MongoDB)

## How to run the project locally:

### Requirements

- [Node.js](https://nodejs.org/) 20.19+ (required by Vite 7 and Mongoose 9)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on `mongodb://localhost:27017` (the database `handmade-shop` is created automatically)

### Server (Backend)

1. Navigate to the `handmade-backend` folder
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in the values (see [Environment variables](#environment-variables))
4. (Optional) Seed the database with sample products: `npm run seed` - this **deletes** all existing products first
5. Start the server with `npm run dev`

The API runs on **http://localhost:5000**.

### Store (Frontend)

1. Navigate to the `handmade-store` folder
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in the values (see [Environment variables](#environment-variables))
4. Start the app with `npm run dev`

The app runs on **http://localhost:5173** (the backend only accepts CORS requests from this origin).

### Environment variables

#### `handmade-backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `JWT_SECRET` | Yes | Secret key used to sign and verify the JWT auth tokens - a long random string (e.g. 64 hex characters). |
| `NODE_ENV` | No | Runtime mode (`development` or `production`); when set to `production` the auth cookie is sent only over HTTPS (`secure` flag). |

Generate a random value for `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### `handmade-store/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | Base URL of the backend API without a trailing slash (default: `http://localhost:5000`). |

# Booking API (Express + TypeScript)

A REST API for managing bookings, built with **Express**, **TypeScript**, **Sequelize**, and **PostgreSQL**. Includes JWT authentication, email notifications, CSRF protection, and auto-generated Swagger documentation.

## Features

- 🔐 **Authentication** — JWT-based auth with bcrypt password hashing
- 📅 **Booking management** — create, view, and manage bookings via REST endpoints
- 🗄️ **PostgreSQL + Sequelize** — relational data model with a full-featured ORM
- 📧 **Email notifications** — transactional emails via Nodemailer + SendGrid
- 🛡️ **Security** — CSRF protection, input validation with express-validator
- 📖 **API docs** — interactive Swagger UI generated from JSDoc annotations
- 🧹 **Code quality** — ESLint + Prettier with check/fix scripts

## Tech Stack

| Layer | Technology |
|---|---|
| Server | Express, TypeScript |
| Database | PostgreSQL, Sequelize |
| Auth | JSON Web Tokens, bcryptjs |
| Email | Nodemailer, SendGrid |
| Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Validation | express-validator, csrf |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally or a connection string to a hosted instance

### Installation

```bash
git clone https://github.com/guestDI/my-express-booking.git
cd my-express-booking
npm install
```

### Configuration

Create a `.env` file:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/booking
JWT_SECRET=your-secret-key
SENDGRID_API_KEY=your-sendgrid-key
```

### Run

```bash
# Development
npm start

# Production build
npm run build
npm run serve
```

## API Documentation

Once the server is running, interactive Swagger docs are available at:

```
http://localhost:3000/api-docs
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Run in development with ts-node |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run serve` | Run the compiled build |
| `npm run lint:check` / `lint:fix` | Lint the codebase |
| `npm run format:check` / `format:write` | Check/apply Prettier formatting |

## What I'd Improve Next

- [ ] Add automated tests (unit + endpoint)
- [ ] Dockerize the app + database for one-command setup
- [ ] Rate limiting on auth endpoints

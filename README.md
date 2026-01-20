# NestJS Application

A NestJS application featuring a RESTful Products API built with TypeScript.

## Description

This is a NestJS application that demonstrates core NestJS concepts including controllers, modules, decorators, and RESTful API design. The application includes a Products API with various endpoints showcasing different HTTP methods and routing patterns.

## Features

- RESTful Products API
- Multiple HTTP methods (GET, PUT, DELETE)
- Query parameter handling (pagination support)
- Route parameters
- Pattern-based routing
- Custom HTTP status codes

## Technologies Used

- NestJS v11.0.1
- TypeScript v5.7.3
- Node.js
- Express
- Jest (testing)
- ESLint & Prettier (code quality)

## Installation

```bash
npm install
```

## Running the Application

```bash
# development mode
npm run start

# watch mode (recommended for development)
npm run start:dev

# debug mode
npm run start:debug

# production mode
npm run start:prod
```

The application will start on `http://localhost:3000` by default.

## API Endpoints

### Products

| Method | Endpoint | Description | Query Params | Response Code |
|--------|----------|-------------|--------------|---------------|
| GET | `/products` | Get all products | `page`, `limit` | 200 |
| GET | `/products/:id` | Get product by ID | - | 203 |
| GET | `/products/ab*cd` | Pattern matching route | - | 200 |
| PUT | `/products/:id` | Update product | - | 200 |
| DELETE | `/products` | Delete product | - | 200 |

### Example Requests

```bash
# Get all products with pagination
GET http://localhost:3000/products?page=1&limit=10

# Get product by ID
GET http://localhost:3000/products/123

# Pattern matching example
GET http://localhost:3000/products/abcd
GET http://localhost:3000/products/abXYZcd

# Update product
PUT http://localhost:3000/products/123

# Delete product
DELETE http://localhost:3000/products
```

## Testing

```bash
# unit tests
npm run test

# watch mode
npm run test:watch

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

# debug tests
npm run test:debug
```

## Code Quality

```bash
# format code
npm run format

# lint code
npm run lint
```

## Project Structure

```
src/
├── app.controller.ts       # Main application controller
├── app.controller.spec.ts  # Main controller tests
├── app.module.ts           # Root module
├── app.service.ts          # Main application service
├── main.ts                 # Application entry point
└── products/
    ├── products.controller.ts       # Products API controller
    └── products.controller.spec.ts  # Products controller tests
```

## License

This project is licensed under the UNLICENSED license.

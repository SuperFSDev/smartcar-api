# Vehicle API

This project provides an API for fetching vehicle information, security status, fuel range, battery range, and performing engine actions.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
  - [Swagger](#swagger)
  - [JSDoc](#jsdoc)
- [Code Quality](#code-quality)
  - [Linting](#linting)
  - [Prettier](#prettier)
- [Testing](#testing)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/SuperFSDev/smartcar-api.git

   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

Start the server:

```sh
npm start
```

The server will start on http://localhost:3000.

## API Endpoints

### Get Vehicle Info

- **URL**: /vehicles/:id
- **Method**: GET
- **Response**:

```
{
  "vin": "1HGCM82633A123456",
  "color": "Blue",
  "doorCount": 4,
  "driveTrain": "AWD"
}
```

### Get Security Status

- **URL**: /vehicles/:id/doors
- **Method**: GET
- **Response**:

```
[
  { "location": "frontLeft", "locked": false },
  { "location": "frontRight", "locked": true },
  ...
]
```

### Get Fuel Range

- **URL**: /vehicles/:id/fuel
- **Method**: GET
- **Response**:

```
{ "percent": 30.2 }
```

### Get Battery Range

- **URL**: /vehicles/:id/battery
- **Method**: GET
- **Response**:

```
{ "percent": 85.6 }
```

### Action Engine

- **URL**: /vehicles/:id/engine
- **Method**: POST
- **Body**:

```
{ "action": "START" }

```

- **Response**:

```
{ "status": "success" }
```

## API Documentation

### Swagger

The API documentation is available at http://localhost:3000/api-docs once the server is running. Swagger is used to generate interactive API documentation.

### JSDoc

JSDoc comments are used throughout the codebase to provide inline documentation. You can generate doc files using the following script:

```sh
npm run docs
```

## Code Quality

### Linting

ESLint is used to maintain code quality. The configuration file .eslintrc.js is included in the project.

To run the linter:

```sh
npm run lint
```

To fix linting errors automatically:

```sh
npm run lint:fix
```

### Prettier

Prettier is used for code formatting. The configuration file .prettierrc is included in the project.

To format the code:

```sh
npm run format
```

## Testing

To run tests, use:

```sh
npm test
```

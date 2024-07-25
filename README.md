# Vehicle API

This project provides an API for fetching vehicle information, security status, fuel range, battery range, and performing engine actions.

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

## Running Tests

To run tests, use:

```sh
npm test
```

# API Endpoint Documentation

## /user/register Endpoint

### Description
The `/user/register` endpoint allows users to register by providing their full name, email, and password. The endpoint validates the input data, hashes the password, and creates a new user in the database. A JWT token is also generated and returned upon successful registration.

---

### HTTP Method
**POST**

---

### Endpoint URL
`/user/register`

---

### Request Body
The request body must be in JSON format with the following fields:

| Field               | Type     | Required | Description                                       |
|---------------------|----------|----------|---------------------------------------------------|
| `fullname.firstname` | String   | Yes      | First name of the user (min. 3 characters).       |
| `fullname.lastname`  | String   | No       | Last name of the user (optional, min. 3 characters). |
| `email`             | String   | Yes      | Email address of the user (must be valid).        |
| `password`          | String   | Yes      | Password of the user (min. 6 characters).         |

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Validation
The following validation rules apply:

1. `fullname.firstname` must have at least 3 characters.
2. `fullname.lastname` (if provided) must have at least 3 characters.
3. `email` must be a valid email address.
4. `password` must have at least 6 characters.

---

### Responses

| Status Code | Description                                         |
|-------------|-----------------------------------------------------|
| 201         | User registered successfully. Returns token and user details. |
| 400         | Validation error. Returns details of validation errors.         |
| 500         | Internal server error.                                |

#### Example Success Response
**Status Code:** 201
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Example Error Response
**Status Code:** 400
```json
{
  "errors": [
    {
      "msg": "First name must be least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}

---

### Notes
- The password is securely hashed before being stored in the database.
- A JWT token is generated and returned to authenticate the user for subsequent requests.
- Make sure to include the `Authorization` header with the token for protected routes.

---

## /user/login Endpoint

### Description
The `/user/login` endpoint allows users to log in by providing their email and password. The endpoint validates the input, verifies the user's credentials, and returns a JWT token if authentication is successful.

---

### HTTP Method
**POST**

---

### Endpoint URL
`/user/login`

---

### Request Body
The request body must be in JSON format with the following fields:

| Field     | Type   | Required | Description                       |
|-----------|--------|----------|-----------------------------------|
| `email`   | String | Yes      | Email address of the user.         |
| `password`| String | Yes      | Password of the user.              |

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Validation
The following validation rules apply:

1. `email` must be a valid email address.
2. `password` must not be empty.

---

### Responses

| Status Code | Description                                         |
|-------------|-----------------------------------------------------|
| 200         | User logged in successfully. Returns token and user details. |
| 400         | Validation error. Returns details of validation errors.         |
| 401         | Authentication failed. Invalid email or password.   |
| 500         | Internal server error.                              |

#### Example Success Response
**Status Code:** 200
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Example Error Response
**Status Code:** 401
```json
{
  "message": "Invalid email or password"
}

---

### Notes
- Ensure the `email` and `password` fields are correctly provided in the request body.
- A JWT token is returned to authenticate the user for subsequent requests.
- Include the `Authorization` header with the token for protected routes.

---

## /user/profile Endpoint

### Description
The `/user/profile` endpoint allows authenticated users to retrieve their profile information.

---

### HTTP Method
**GET**

---

### Endpoint URL
`/user/profile`

---

### Headers
The request must include the following header for authentication:

| Header            | Value   | Required | Description                                    |
|--------------------|---------|----------|------------------------------------------------|
| `Authorization`   | Bearer {token} | Yes  | A valid JWT token obtained after login.       |

---

### Responses

| Status Code | Description                          |
|-------------|--------------------------------------|
| 200         | Returns user profile information.    |
| 401         | Unauthorized. Token is missing or invalid. |
| 500         | Internal server error.              |

#### Example Success Response
**Status Code:** 200
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

#### Example Error Response
**Status Code:** 401
```json
{
  "message": "Unauthorized"
}

---

### Notes
- Ensure a valid token is provided in the `Authorization` header.
- This endpoint is protected and requires authentication.

---

## /user/logout Endpoint

### Description
The `/user/logout` endpoint allows authenticated users to log out by clearing the JWT token from cookies and blacklisting it to prevent reuse.

---

### HTTP Method
**GET**

---

### Endpoint URL
`/user/logout`

---

### Headers
The request must include the following header for authentication:

| Header            | Value   | Required | Description                                    |
|--------------------|---------|----------|------------------------------------------------|
| `Authorization`   | Bearer {token} | Yes  | A valid JWT token obtained after login.       |

---

### Responses

| Status Code | Description                          |
|-------------|--------------------------------------|
| 200         | User logged out successfully.        |
| 401         | Unauthorized. Token is missing or invalid. |
| 500         | Internal server error.              |

#### Example Success Response
**Status Code:** 200
```json
{
  "message": "Logout successfully"
}
```

#### Example Error Response
**Status Code:** 401
```json
{
  "message": "Unauthorized"
}

---

### Notes
- This endpoint clears the token from cookies and blacklists it to prevent reuse.
- Ensure a valid token is provided in the `Authorization` header.
- This endpoint is protected and requires authentication.

---
# Captain Routes

## Overview
The Captain Routes handle the operations related to captain registration. The routes use Express.js for routing and `express-validator` for input validation. This documentation provides details about the available routes, their request structure, and expected responses.

---

## Routes

### 1. Register a Captain

**Endpoint:**
```
POST /api/captain/register
```

**Description:**
Registers a new captain with vehicle details and validates the input data.

**Request Body:**
The body of the request should be in JSON format and include the following fields:

| Field                      | Type     | Validation                                       | Description                              |
|----------------------------|----------|-------------------------------------------------|------------------------------------------|
| `email`                   | String   | Must be a valid email address                  | Email of the captain                     |
| `fullname.firstname`       | String   | Minimum 3 characters                           | First name of the captain                |
| `fullname.lastname`        | String   | (Optional)                                     | Last name of the captain                 |
| `password`                 | String   | Minimum 6 characters                           | Password for captain authentication      |
| `vehicle.color`            | String   | Minimum 3 characters                           | Color of the captain's vehicle           |
| `vehicle.plate`            | String   | Minimum 3 characters                           | License plate of the captain's vehicle   |
| `vehicle.capacity`         | Integer  | Minimum 1 character                            | Seating capacity of the captain's vehicle|
| `vehicle.vehicleType`      | String   | Minimum 3 characters                           | Type of the captain's vehicle            |

**Validation Rules:**
- Uses `express-validator` to ensure proper validation of all fields.
- Returns appropriate error messages for invalid fields.

**Example Request:**
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "Sedan"
  }
}
```

**Example Response:**
- Success:
```json
{
  "message": "Captain registered successfully",
  "data": {
    "id": "unique_captain_id",
    "email": "captain@example.com"
  }
}
```
- Validation Error:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Service Details

The `captain.service.js` file handles the logic for creating a new captain in the database. It validates that all required fields are provided and throws an error if any field is missing.

### Function: `createCaptain`

**Description:**
Creates a new captain record in the database.

**Parameters:**
| Parameter      | Type   | Description                              |
|----------------|--------|------------------------------------------|
| `firstname`    | String | First name of the captain                |
| `lastname`     | String | Last name of the captain (optional)      |
| `email`        | String | Email of the captain                     |
| `password`     | String | Password for captain authentication      |
| `color`        | String | Color of the captain's vehicle           |
| `plate`        | String | License plate of the captain's vehicle   |
| `capacity`     | Integer| Seating capacity of the captain's vehicle|
| `vehicleType`  | String | Type of the captain's vehicle            |

**Validation:**
Throws an error if any required field is missing.

**Example Usage:**
```javascript
const { createCaptain } = require('./captain.service');

createCaptain({
  firstname: "John",
  lastname: "Doe",
  email: "captain@example.com",
  password: "password123",
  color: "Blue",
  plate: "ABC123",
  capacity: 4,
  vehicleType: "Sedan"
})
  .then(captain => console.log(captain))
  .catch(err => console.error(err));
```

**Returns:**
An object representing the created captain record.

**Error Handling:**
If a required field is missing, the function will throw an error with the message `"All fields are required"`. Ensure all fields are provided before calling this function.

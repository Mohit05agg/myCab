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
```

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
```

---

### Notes
- Ensure the `email` and `password` fields are correctly provided in the request body.
- A JWT token is returned to authenticate the user for subsequent requests.
- Include the `Authorization` header with the token for protected routes.

---

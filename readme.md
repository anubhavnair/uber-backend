# User API Documentation

## Endpoints

### 1. Register User

#### Endpoint: `/api/user/register`

#### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns the user object along with an authentication token.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 8)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      // other user fields except password
    },
    "token": "jwt_token"
  }
  ```

##### Validation Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

##### Other Errors
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": "Error message"
  }
  ```

### 2. Login User

#### Endpoint: `/api/user/login`

#### Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns the user object along with an authentication token.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 8)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      // other user fields except password
    },
    "token": "jwt_token"
  }
  ```

##### Validation Error
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

##### Authentication Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

##### Other Errors
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": "Error message"
  }
  ```
  ### 3. Get User Profile

#### Endpoint: `/api/user/profile`

#### Description
This endpoint is used to retrieve the profile of the authenticated user. It requires a valid JWT token to be provided in the request headers.

#### Method
`GET`

#### Request Headers
- `Authorization`: `Bearer <jwt_token>`

#### Responses

##### Success
- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    // other user fields except password
  }
  ```

##### Authentication Error
- **Status Code**: `401 Unauthorized`
- **Body**:
  ```json
  {
    "error": "Authentication token is missing or invalid"
  }
  ```

##### Other Errors
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": "Error message"
  }
  ```
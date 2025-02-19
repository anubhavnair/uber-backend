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


# Captain API Documentation

## Endpoints

### 1. Register Captain

#### Endpoint: `/api/captain/register`

#### Description
This endpoint is used to register a new captain. It validates the input data, including vehicle information, creates a new captain account in the database, and returns the captain object along with an authentication token.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, optional, minimum length: 3)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 8)
- `vehicle`: An object containing:
  - `color` (string, required, minimum length: 3)
  - `plate` (string, required, minimum length: 3)
  - `capacity` (number, required, minimum: 1)
  - `vehicleType` (string, required, enum: ['motorcycle', 'car', 'auto', 'van'])
- `status` (string, optional, default: 'inactive', enum: ['active', 'inactive'])
- `location` (optional): An object containing:
  - `lat` (number)
  - `long` (number)

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "location": {
    "lat": 40.7128,
    "long": -74.0060
  }
}
```

#### Responses

##### Success
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 40.7128,
        "long": -74.0060
      }
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

#### Validation Rules
1. Firstname must be at least 3 characters long
2. Email must be a valid email address
3. Password must be at least 8 characters long
4. Vehicle color must be at least 3 characters long
5. Vehicle plate must be at least 3 characters long
6. Vehicle capacity must be at least 1
7. Vehicle type must be one of: motorcycle, car, auto, van

### 2. Login Captain

#### Endpoint: `/api/captain/login`

#### Description
This endpoint is used to authenticate a captain. It validates the input data, checks the captain's credentials, and returns the captain object along with an authentication token.

#### Method
`POST`

#### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required, must be a valid email)
- `password` (string, required, minimum length: 8)

Example:
```json
{
  "email": "john.captain@example.com",
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
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 40.7128,
        "long": -74.0060
      }
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

#### Validation Rules
1. Email must be a valid email address
2. Password must be at least 8 characters long


### 3. Get Captain Profile

#### Endpoint: `/api/captain/profile`

#### Description
This endpoint is used to retrieve the profile of the authenticated captain. It requires a valid JWT token to be provided in the request headers.

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
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 40.7128,
      "long": -74.0060
    }
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


### 4. Logout Captain

#### Endpoint: `/api/captain/logout`

#### Description
This endpoint is used to log out the authenticated captain. It requires a valid JWT token to be provided in the request headers. The token is then blacklisted to prevent further use, and the cookie is cleared.

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
    "message": "Logged out successfully"
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


# My Uber Project's APIs

## Endpoint: `/api/user/register`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns the user object along with an authentication token.

### Method
`POST`

### Request Body
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

### Responses

#### Success
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

#### Validation Error
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

#### Other Errors
- **Status Code**: `400 Bad Request`
- **Body**:
  ```json
  {
    "error": "Error message"
  }
  ```# User Registration API

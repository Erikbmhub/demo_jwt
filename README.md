# API REST + JWT

API REST of user login, logout and view a list of users with Node.js, Express using jwt (jsonwebtoken) authentication.

## Libraries

- **Express**: Framework for building web applications and APIs.
- **Jsonwebtoken**: Library for creating and verifying JSON Web Tokens (JWT).
- **dotenv**: Loads environment variables from a `.env` file.

## Installation

Install dependencies:
```bash
npm i 
```

Start the server on `localhost:3000`:
```bash
npm start
```

## Environment Variables

The project uses environment variables to store sensitive information. Create a `.env` file in the root directory and define the following variable:

```plaintext
JWT_SECRET=miclaveultrasecreta123*
```

An example `.env` file is provided as `.env.example`.

## Endpoints

### [GET] `http://localhost:3000/`
Hello world route. Returns a simple JSON message.

---

### [POST] `http://localhost:3000/autenticar`
Login endpoint. Authenticates the user and returns a JWT if the credentials are correct.

**Request body example**:
```json
{
  "usuario": "alex",
  "contrasena": "123456"
}
```

**Response example**:
```json
{
  "success": true,
  "message": "Autenticación correcta",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- The token is valid for **60 seconds**. This is configured in the `index.js` file under the `expiresIn` property.

---

### [GET] `http://localhost:3000/datos`
Protected route. Returns a list of users if a valid JWT is provided in the `access-token` header.

**HTTP Header**:
- **Key**: `access-token`
- **Value**: `<your-jwt-token>`

**Response example**:
```json
[
  {
    "id": 1,
    "nombre": "Birja"
  },
  {
    "id": 2,
    "nombre": "Muchelle"
  },
  {
    "id": 3,
    "nombre": "Alvaru"
  }
]
```

---

## Key Concepts

### 1. JSON Web Tokens (JWT)
JWT is a compact, URL-safe means of representing claims to be transferred between two parties. In this project:
- The server generates a JWT upon successful login.
- The client includes the JWT in the `access-token` header for protected routes.

### 2. Environment Variables
The secret key used to sign and verify JWTs is stored in an environment variable (`JWT_SECRET`). This ensures sensitive information is not hardcoded in the source code.

### 3. Middleware for Protected Routes
The `/datos` route is protected by a middleware (`rutasProtegidas`) that:
- Verifies the presence of a token in the `access-token` header.
- Decodes and validates the token using the secret key.

### 4. Expiration of Tokens
Tokens expire after **60 seconds** in this demo. This short expiration time is for demonstration purposes. In a real-world application, you might use a longer expiration time and implement a **refresh token** mechanism.

### 5. Error Handling
The project includes basic error handling:
- Missing or invalid tokens return appropriate HTTP status codes (`401` or `403`).
- A generic error handler is included to catch unexpected errors.

---

## Testing the API

You can use tools like **Postman** or **Insomnia** to test the API. For example:
1. Send a POST request to `http://localhost:3000/autenticar` with the correct credentials to get a token.
2. Use the token in the `access-token` header to access the `http://localhost:3000/datos` endpoint.

---

## Additional Notes

- This project is for educational purposes and is not production-ready.
- Always follow best practices for security, such as using HTTPS, validating input, and securely storing sensitive data.
- Consider adding **refresh tokens** and **role-based access control (RBAC)** for more advanced use cases.

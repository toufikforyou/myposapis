# Authentication Documentation

This document covers authentication-related endpoints and features. For general API information, see [API Documentation](./apis-docs.md).

## Manager Authentication

### Login

Authenticate a manager and receive an access token.

**Endpoint:** `POST /api/v1/manager/login`

**Request Body:**

```json
{
    "username": "manager_user",    // Can be username or email
    "password": "Password123!"     // Min 6 characters
}
```

**Success Response (200):**

```json
{
    "status": 200,
    "message": "Manager logged in successfully",
    "data": {
        "token": "jwt_token_string",
        "email": "manager@email.com",
        "username": "manager_user",
        "shops": ["shop-uuid-1", "shop-uuid-2"]  // Array of shop IDs manager has access to
    }
}
```

**Error Responses:**

1. Validation Error (400):

```json
{
    "status": 400,
    "message": "Validation error",
    "errors": [
        {
            "field": "username",
            "message": "Username or email is required"
        }
    ]
}
```

## 2. Invalid Credentials (401)

```json
{
    "status": 401,
    "message": "Invalid credentials"
}
```

### Session Management

- Each successful login creates or updates a session record
- Previous sessions for the same manager are automatically invalidated
- Token expiration: 24 hours
- Sessions are tracked in the database for additional security

### Token Format

The JWT token contains the following payload:

```json
{
    "uid": "manager-uuid",
    "email": "manager@email.com",
    "username": "manager_user",
    "exp": 1234567890  // 24 hours from creation
}
```

### Security Features

1. **Session Tracking**
   - Each login creates/updates a session record
   - Previous sessions are tracked for security
   - Allows for future token revocation

2. **Multiple Shop Access**
   - Returns all shops the manager has access to
   - Supports managers with multiple shop responsibilities

3. **Credential Flexibility**
   - Login with either username or email
   - Same endpoint handles both authentication methods

### Related Documentation

- [API Documentation](./apis-docs.md)
- [Shop and Manager Documentation](./shop-and-manager-docs.md)

### Field Validations

| Field    | Required | Validation            |
|----------|----------|-----------------------|
| username | Yes      | Non-empty string      |
| password | Yes      | Non-empty string      |

### Best Practices

1. **Token Storage**
   - Store token securely (e.g., HttpOnly cookies)
   - Never store in localStorage for production

2. **Error Handling**
   - Generic error messages for security
   - Detailed validation errors for UX

3. **Session Management**
   - One active session per manager
   - New login invalidates previous sessions

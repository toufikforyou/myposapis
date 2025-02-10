# Protected Routes Documentation

This document covers protected routes and authentication requirements. For general authentication, see [Authentication Documentation](./auth-docs.md).

## Authentication Header

All protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## Protected Routes

### Get Manager Profile

Retrieve the authenticated manager's profile and associated shops.

**Endpoint:** `GET /api/v1/manager/profile`

**Authentication:** Required

**Success Response (200):**

```json
{
    "status": 200,
    "message": "Profile retrieved successfully",
    "data": {
        "manager": {
            "uid": "manager-uuid",
            "name": "Manager Name",
            "email": "manager@email.com",
            "username": "manager_user",
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX",
            "managedShops": [
                {
                    "shop": {
                        "sid": "shop-uuid",
                        "name": "Shop Name",
                        "email": "shop@email.com"
                    }
                }
            ]
        }
    }
}
```

**Error Responses:**

1. No Token (401):

```json
{
    "status": 401,
    "message": "No token provided"
}
```

## 2. Invalid Token (401)

```json
{
    "status": 401,
    "message": "Invalid token"
}
```

## 3. Expired Token (401)

```json
{
    "status": 401,
    "message": "Token expired"
}
```

## 4. Invalid Session (401)

```json
{
    "status": 401,
    "message": "Invalid or expired session"
}
```

## 5. Manager Not Found (404)

```json
{
    "status": 404,
    "message": "Manager not found"
}
```

### Security Features

1. **Token Verification**
   - Validates JWT token authenticity
   - Checks token expiration
   - Verifies manager existence

2. **Session Management**
   - Validates active session
   - Prevents use of revoked tokens
   - Tracks session state

### Related Documentation

- [Authentication](./auth-docs.md)
- [API Documentation](./apis-docs.md)
- [Shop and Manager Documentation](./shop-and-manager-docs.md)

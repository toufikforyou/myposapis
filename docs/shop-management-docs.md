# Shop Management Documentation

This document covers shop management features for authenticated SUPERADMIN users. For general shop information, see [Shop and Manager Documentation](./shop-and-manager-docs.md).

## Protected Routes

All routes require authentication. See [Authentication Documentation](./auth-docs.md).

### 1. Create Additional Shop

Allows a SUPERADMIN to create additional shops under their management.

**Endpoint:** `POST /api/v1/shop/additional`

**Authentication:** Required (SUPERADMIN only)

**Request Body (multipart/form-data):**

Required Fields:

```json
{
    "name": "Shop Name",           // string (3-100 chars)
    "email": "shop@email.com",     // valid email, unique
    "phone": "+1234567890"         // valid phone number
}
```

Optional Fields:

```json
{
    "logo": "file",               // JPG/JPEG/PNG, max 2MB
    "address": "Shop Address",    // string (5-200 chars)
    "website": "www.shop.com",    // valid URL
    "bin": "123456",             // string (5-50 chars)
}
```

**Success Response (201):**

```json
{
    "status": 201,
    "message": "Additional shop created successfully",
    "data": {
        "shop": {
            "sid": "shop-uuid",
            "name": "Shop Name",
            "email": "shop@email.com",
            "phone": "+1234567890",
            "logo": "shop-1234567890.jpg",
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
    }
}
```

**Error Responses:**

1. Unauthorized (401):

```json
{
    "status": 401,
    "message": "No token provided"
}
```

## 2. Forbidden (403)

```json
{
    "status": 403,
    "message": "Only SUPERADMIN can create additional shops"
}
```

## 3. Validation Error (400)

```json
{
    "status": 400,
    "message": "Validation error",
    "errors": [
        {
            "field": "email",
            "message": "Valid shop email is required"
        }
    ]
}
```

### 2. Assign Shop Manager

Allows a SUPERADMIN to assign new managers (ADMIN role) to their shops.

**Endpoint:** `POST /api/v1/shop/:shopId/manager`

**Authentication:** Required (SUPERADMIN only)

**URL Parameters:**

- `shopId`: UUID of the shop

**Request Body:**

```json
{
    "name": "Manager Name",        // required, string (2-100 chars)
    "username": "manager_user",    // required, string (4-30 chars, alphanumeric with _ and .)
    "email": "manager@email.com",  // required, valid email, unique
    "password": "Password123!",    // required, min 6 chars
    "role": "ADMIN"               // required, must be "ADMIN"
}
```

**Success Response (201):**

```json
{
    "status": 201,
    "message": "Manager assigned successfully",
    "data": {
        "manager": {
            "uid": "manager-uuid",
            "name": "Manager Name",
            "username": "manager_user",
            "email": "manager@email.com",
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
    }
}
```

**Error Responses:**

1. Invalid Shop ID (400):

```json
{
    "status": 400,
    "message": "Validation error",
    "errors": [
        {
            "field": "shopId",
            "message": "Invalid shop ID format"
        }
    ]
}
```

## 2. Unauthorized (401)

```json
{
    "status": 401,
    "message": "No token provided"
}
```

## 3. Forbidden (403)

```json
{
    "status": 403,
    "message": "Only SUPERADMIN can assign managers"
}
```

## 4. Duplicate Manager (400)

```json
{
    "status": 400,
    "message": "Manager already exists",
    "errors": [
        {
            "field": "email",
            "message": "Email already in use"
        }
    ]
}
```

### Field Validations

#### Additional Shop Fields

| Field         | Required | Validation                    |
|---------------|----------|-------------------------------|
| name          | Yes      | 3-100 characters             |
| email         | Yes      | Valid email, unique          |
| phone         | Yes      | Valid phone number format    |
| logo          | No       | JPG/JPEG/PNG, max 2MB        |
| address       | No       | 5-200 characters             |
| website       | No       | Valid URL                    |
| bin           | No       | 5-50 characters              |

#### Assign Manager Fields

| Field    | Required | Validation                                |
|----------|----------|-------------------------------------------|
| name     | Yes      | 2-100 characters                          |
| username | Yes      | 4-30 chars, alphanumeric with _ and .     |
| email    | Yes      | Valid email, unique                       |
| password | Yes      | Min 6 characters                          |
| role     | Yes      | Must be "ADMIN"                          |
| shopId   | Yes      | Valid UUID format                        |

### Related Documentation

- [Authentication](./auth-docs.md)
- [Shop and Manager Documentation](./shop-and-manager-docs.md)
- [API Documentation](./apis-docs.md)

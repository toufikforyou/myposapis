# I'll help create a structured documentation system

```markdown:docs/apis-docs.md
# API Documentation

Welcome to the API documentation. This documentation provides detailed information about the available endpoints, request/response formats, and authentication methods.

## Available API Versions

- [V1 Documentation](./v1/index.md)
  - [Shop and Manager System](./v1/shop-and-manager.md)

## General Information

### Base URL

<http://your-domain.com/api>

### Authentication
Most endpoints require authentication. Use the following header:

Authorization: Bearer <token>

## Response Format

All API responses follow this standard format:

**Success Response:**

```json
{
    "status": 200,
    "message": "Success message",
    "data": {
        // Response data
    }
}
```

**Error Response:**

```json
{
    "status": 400,
    "message": "Error message",
    "errors": [
        {
            "field": "fieldName",
            "message": "Error description"
        }
    ]
}
```

## Common Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Now, let's create the shop and manager specific documentation:

```markdown:docs/v1/shop-and-manager.md
# Shop and Manager Management API

## Shop Management

### Register Shop
Create a new shop in the system.

**Endpoint:** `POST /v1/shop`

**Request Body:**
```json
{
    "name": "Shop Name",           // required, string (3-100 chars)
    "email": "shop@email.com",     // required, valid email
    "phone": "+1234567890",        // required, valid phone number
    "address": "Shop Address",     // optional, string (5-200 chars)
    "country": "Country Name",     // optional, string (2-100 chars)
    "website": "www.shop.com",     // optional, valid URL
    "logo": "logo-url.jpg",        // optional, valid image URL
    "bin": "123456",              // optional, string (5-50 chars)
    "description": "Description",  // optional, string (max 500 chars)
    "industry": "Retail",         // optional, string (2-100 chars)
    "type": "Online",             // optional, string (2-50 chars)
    "employeeRange": "10-50"      // optional, string (max 50 chars)
}
```

**Success Response (201):**

```json
{
    "status": 201,
    "message": "Shop registered successfully",
    "data": {
        "shop": {
            "sid": "uuid-string",
            "name": "Shop Name",
            // ... other shop fields
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
    }
}
```

**Error Responses:**

- Validation Error (400)
- Duplicate Entry (400)

## Manager Management

### Register Manager

Register a manager with SUPERADMIN role for an existing shop.

**Endpoint:** `POST /v1/manager`

**Request Body:**

```json
{
    "name": "Manager Name",        // required, string (2-100 chars)
    "username": "manager_user",    // required, string (4-30 chars)
    "email": "manager@email.com",  // required, valid email
    "password": "Password123!",    // required, min 6 chars
    "sid": "shop-uuid"            // required, valid shop ID
}
```

**Success Response (201):**

```json
{
    "status": 201,
    "message": "Manager registered successfully",
    "data": {
        "manager": {
            "uid": "uuid-string",
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

- Validation Error (400)
- Duplicate Entry (400)
- Shop Not Found (404)

## Field Validations

### Shop Fields

| Field         | Required | Validation                    |
|---------------|----------|-------------------------------|
| name          | Yes      | 3-100 characters             |
| email         | Yes      | Valid email, unique          |
| phone         | Yes      | Valid phone number, unique    |
| address       | No       | 5-200 characters             |
| country       | No       | 2-100 characters             |
| website       | No       | Valid URL                    |
| logo          | No       | Valid image URL              |
| bin           | No       | 5-50 characters              |
| description   | No       | Max 500 characters           |
| industry      | No       | 2-100 characters             |
| type          | No       | 2-50 characters              |
| employeeRange | No       | Max 50 characters            |

### Manager Fields

| Field    | Required | Validation                                |
|----------|----------|-------------------------------------------|
| name     | Yes      | 2-100 characters                          |
| username | Yes      | 4-30 chars, alphanumeric with _ and .     |
| email    | Yes      | Valid email, unique                       |
| password | Yes      | Min 6 characters                          |
| sid      | Yes      | Valid existing shop ID                    |

## Error Response Examples

### Validation Error

```json
{
    "status": 400,
    "message": "Validation error",
    "errors": [
        {
            "field": "email",
            "message": "Valid email is required"
        }
    ]
}
```

### Duplicate Entry

```json
{
    "status": 400,
    "message": "Email already exists",
    "errors": [
        {
            "field": "email",
            "message": "Email already exists"
        }
    ]
}
```

### Shop Not Found

```json
{
    "status": 404,
    "message": "Shop not found",
    "errors": [
        {
            "field": "sid",
            "message": "Shop not found"
        }
    ]
}
```

This documentation structure:

1. Main API docs as an index
2. Detailed shop and manager documentation
3. Clear request/response examples
4. Field validation tables
5. Error response examples
6. Organized by feature

Would you like me to add or modify any specific part?

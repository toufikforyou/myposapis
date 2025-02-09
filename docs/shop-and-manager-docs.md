# I'll help create comprehensive API documentation for the shop and manager registration system

```markdown:docs/apis-docs.md
# Shop Management System API Documentation

## Base URL

<http://your-domain.com/api/v1>



## Endpoints

### 1. Register Shop
Create a new shop in the system.

**Endpoint:** `POST /shop`

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
            "email": "shop@email.com",
            "phone": "+1234567890",
            "address": "Shop Address",
            "country": "Country Name",
            "website": "www.shop.com",
            "logo": "logo-url.jpg",
            "bin": "123456",
            "description": "Description",
            "industry": "Retail",
            "type": "Online",
            "employeeRange": "10-50",
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
    }
}
```

**Error Responses:**

- `400`: Validation Error

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

- `400`: Duplicate Entry

```json
{
    "status": 400,
    "message": "Shop email already exists",
    "errors": [
        {
            "field": "email",
            "message": "Shop email already exists"
        }
    ]
}
```

## 2. Register Manager

Register a manager for an existing shop with SUPERADMIN role.

**Endpoint:** `POST /manager`

**Request Body:**

```json
{
    "name": "Manager Name",        // required, string (2-100 chars)
    "username": "manager_user",    // required, string (4-30 chars, alphanumeric with _ and .)
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

- `400`: Validation Error

```json
{
    "status": 400,
    "message": "Validation error",
    "errors": [
        {
            "field": "username",
            "message": "Username can only contain letters, numbers, dots and underscores"
        }
    ]
}
```

- `400`: Duplicate Entry

```json
{
    "status": 400,
    "message": "Manager email already exists",
    "errors": [
        {
            "field": "email",
            "message": "Manager email already exists"
        }
    ]
}
```

- `404`: Shop Not Found

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

## Notes

1. **Shop Registration:**
   - Email and phone must be unique
   - All optional fields will use default values if not provided
   - Response includes the complete shop details

2. **Manager Registration:**
   - Username and email must be unique
   - Password should be at least 6 characters
   - Manager is automatically assigned SUPERADMIN role for the shop
   - Password is not included in the response
   - Shop must exist before manager registration

3. **Error Handling:**
   - All errors include specific field information
   - Validation errors list all failed validations
   - Duplicate checks are performed for unique fields

This documentation provides:

1. Clear endpoint descriptions
2. Request/response formats
3. Field requirements and validations
4. Error scenarios and responses
5. Important notes about the system
6. All possible response formats

Would you like me to add or clarify any specific part of the documentation?

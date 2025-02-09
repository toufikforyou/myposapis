# API Documentation

Welcome to the API documentation. This documentation provides detailed information about the available endpoints, request/response formats, and authentication methods.

## Documentation Sections

- [General API Information](./apis-docs.md)
- [Shop and Manager Management](./shop-and-manager-docs.md)
- [Authentication](./auth-docs.md)

## General Information

### Base URL

```base
http://your-domain.com/api/v1
```

### Response Format

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

### Common Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## API Endpoints

### 1. Shop Registration

**Endpoint:** `POST /shop`

**Request Body (multipart/form-data):**

Required Fields:

```json
{
    "name": "Shop Name",           // string (3-100 chars)
    "email": "shop@email.com",     // valid email
    "phone": "+1234567890"         // valid phone number
}
```

Optional Fields:

```json
{
    "logo": "file",               // JPG/JPEG/PNG, max 2MB
    "address": "Shop Address",    // string (5-200 chars)
    "country": "Country Name",    // string (2-100 chars)
    "website": "www.shop.com",    // valid URL
    "bin": "123456",             // string (5-50 chars)
    "description": "Description", // string (max 500 chars)
    "industry": "Retail",        // string (2-100 chars)
    "type": "Online",            // string (2-50 chars)
    "employeeRange": "10-50"     // string (max 50 chars)
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
            "logo": "shop-1234567890.jpg",  // If logo was uploaded
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
    }
}
```

#### Logo Upload Specifications

- Supported formats: JPG, JPEG, PNG
- Maximum file size: 2MB
- File will be saved as: `shop-{timestamp}.{extension}`
- Upload directory: `public/shop/logo/`
- Field name in form: `logo`

#### Error Responses

1. Validation Error (400):

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

## 2. Logo Upload Error (400)

```json

{
    "status": 400,
    "message": "Logo upload error",
    "errors": [
        {
            "field": "logo",
            "message": "Only JPG, JPEG, or PNG format allowed"
        }
    ]
}
```

## 3. File Size Error (400)

```json
{
    "status": 400,
    "message": "Logo upload error",
    "errors": [
        {
            "field": "logo",
            "message": "File too large"
        }
    ]
}
```

### 2. Manager Registration

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

Error Responses

1. Validation Error (400):

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

## 2. Duplicate Entry (400)

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

## 3. Shop Not Found (404)

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

## Field Validations

### Shop Fields

| Field         | Required | Validation                    |
|---------------|----------|-------------------------------|
| name          | Yes      | 3-100 characters             |
| email         | Yes      | Valid email, unique          |
| phone         | Yes      | Valid phone number, unique    |
| logo          | No       | JPG/JPEG/PNG, max 2MB        |
| address       | No       | 5-200 characters             |
| country       | No       | 2-100 characters             |
| website       | No       | Valid URL                    |
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

## This documentation

- Has a clear structure
- Includes all endpoints
- Shows request/response formats
- Details validation rules
- Lists error scenarios
- Provides field specifications
- Includes logo upload details

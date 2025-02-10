# I'll help create comprehensive API documentation for the shop and manager registration system

## Shop and Manager API Documentation

## Shop Management

### Register Shop

Create a new shop with optional logo upload.

**Endpoint:** `POST /v1/shop`

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
            // ... other shop fields
            "createdAt": "2024-03-XX",
            "updatedAt": "2024-03-XX"
        }
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

### Logo Upload Specifications

- Supported formats: JPG, JPEG, PNG
- Maximum file size: 2MB
- File will be saved as: `shop-{timestamp}.{extension}`
- Upload directory: `public/shop/logo/`
- Field name in form: `logo`

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

1. This documentation update:
2. Clarifies the multipart/form-data requirement
3. Separates required and optional fields
4. Shows logo-specific error responses
5. Includes logo upload specifications
6. Shows the logo field in the success response

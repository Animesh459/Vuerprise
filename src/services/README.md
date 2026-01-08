# API Services

This directory contains all API service modules for the application. Each service handles API calls for a specific domain/module.

## Architecture

```
services/
├── index.js              # Central export for all services
├── productService.js     # Product CRUD operations
├── categoryService.js    # Category management
├── colorService.js       # Color management
├── sizeService.js        # Size management
├── packService.js        # Pack management
└── masterColorService.js # Master color management
```

## Usage

### Import Services

```javascript
// Import single service
import { productService } from "@/services";

// Import multiple services
import { productService, categoryService, colorService } from "@/services";
```

### Example: Using Product Service

```javascript
import { productService } from "@/services";

// In a component
export default {
  async created() {
    try {
      // Get all products
      const response = await productService.getAll({ page: 1, per_page: 20 });
      this.products = response.data.data;

      // Get single product
      const product = await productService.getById(1);

      // Create product
      const newProduct = await productService.create({
        name: "Product Name",
        price: 100,
      });

      // Update product
      await productService.update(1, { name: "Updated Name" });

      // Delete product
      await productService.delete(1);
    } catch (error) {
      console.error("API Error:", error);
    }
  },
};
```

### Example: Using Category Service

```javascript
import { categoryService } from "@/services";

// Get all categories (nested tree structure)
const categories = await categoryService.getAll();

// Get flat list of all categories
const flatCategories = await categoryService.getAllFlat();

// Create category with image
const formData = new FormData();
formData.append("name", "New Category");
formData.append("status", "active");
formData.append("image", fileInput.files[0]);

await categoryService.create(formData);
```

## Service Structure

Each service follows this pattern:

```javascript
import apiClient from "@/utils/axios";

export const myService = {
  getAll(params = {}) {
    return apiClient.get("/endpoint", { params });
  },

  getById(id) {
    return apiClient.get(`/endpoint/${id}`);
  },

  create(data) {
    return apiClient.post("/endpoint", data);
  },

  update(id, data) {
    return apiClient.put(`/endpoint/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`/endpoint/${id}`);
  },
};
```

## Adding New Services

1. Create new service file in `services/` directory
2. Follow naming convention: `{module}Service.js`
3. Export the service object
4. Add export to `index.js`

Example:

```javascript
// services/vendorService.js
import apiClient from "@/utils/axios";

export const vendorService = {
  getAll() {
    return apiClient.get("/vendors");
  },
  // ... other methods
};

// services/index.js
export { vendorService } from "./vendorService";
```

## Response Handling

All services return Axios promises. Handle responses in components:

```javascript
try {
  const response = await productService.getAll();
  // Success: response.data contains the API response
  console.log(response.data);
} catch (error) {
  // Error: error.response.data contains error details
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  }
}
```

## File Upload Services

For services that handle file uploads (like categories and colors), use `FormData`:

```javascript
const formData = new FormData();
formData.append("name", "Value");
formData.append("image", fileObject);

await categoryService.create(formData);
```

The service automatically sets the correct `Content-Type: multipart/form-data` header.

## Notes

- All services use the centralized `apiClient` from `@/utils/axios`
- Authentication tokens are automatically attached by axios interceptors
- 401 errors are automatically handled (redirect to login)
- All endpoints are prefixed with the API base URL from `.env`

# Router Structure

This directory contains the modular routing configuration for the application.

## Directory Structure

```
router/
├── index.js              # Main router configuration
├── guards/               # Route guards (auth, permissions, etc.)
│   └── auth.js          # Authentication guards
└── modules/             # Route modules organized by feature
    ├── auth.js          # Authentication routes (login, etc.)
    ├── dashboard.js     # Dashboard routes
    ├── products.js      # Product CRUD routes
    ├── productSettings.js # Product settings (colors, packs, sizes, etc.)
    ├── receiving.js     # Receiving module routes
    ├── orders.js        # Order management routes
    ├── customers.js     # Customer management routes
    ├── inventory.js     # Inventory routes
    └── utilities.js     # Utility pages
```

## How to Add New Routes

### 1. Create a new module file

```javascript
// router/modules/myModule.js
import { requireAuth } from "../guards/auth";

export default [
  {
    path: "/my-feature",
    name: "myFeature",
    component: () => import("@/views/MyFeature.vue"),
    beforeEnter: requireAuth,
    meta: { title: "My Feature" },
  },
];
```

### 2. Import the module in `router/index.js`

```javascript
import myModuleRoutes from "./modules/myModule";

const routes = [
  // ... other routes
  ...myModuleRoutes,
];
```

## Route Naming Convention

Use dot notation for nested routes:

- `products` - Parent route
- `products.list` - List page
- `products.add` - Create page
- `products.edit` - Edit page
- `products.detail` - Detail page

## Route Meta Fields

- `title` - Page title (automatically set in document.title)
- `hideHeader` - Hide the header component
- `requiresAuth` - Requires authentication (handled by beforeEnter guard)

## Guards

### `requireAuth`

- Checks if user has a valid token
- Redirects to `/login` if not authenticated

### `requireGuest`

- Redirects authenticated users to dashboard
- Used for login page

## Notes

- All routes use lazy loading with `() => import()`
- Guards check `localStorage.getItem('authToken')`
- Page titles are automatically set from route meta

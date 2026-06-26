export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  CATALOG: {
    ROOT: "/catalog",
    PRODUCT: "/catalog/:id",
    CATEGORY: "/catalog/category/:categoryId",
  },

  CHECKOUT: {
    CART: "/cart",
    CHECKOUT: "/checkout",
    SUCCESS: "/checkout/success",
    CANCEL: "/checkout/cancel",
  },

  ACCOUNT: {
    PROFILE: "/profile",
    ORDERS: "/orders",
    SETTINGS: "/settings",
  },

  ADMIN: {
    ROOT: "/admin",

    DASHBOARD: "/admin/dashboard",

    PRODUCTS: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    EDIT_PRODUCT: "/admin/products/:id/edit",

    CATEGORIES: "/admin/categories",

    ORDERS: "/admin/orders",
    ORDER_DETAILS: "/admin/orders/:id",

    USERS: "/admin/users",
  },

  NOT_FOUND: "*",
} as const;

export type RouteKey = typeof ROUTES;
const env = {
  API_URL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:5000",

  APP_NAME:
    import.meta.env.VITE_APP_NAME ??
    "Shopiy",

  NODE_ENV:
    import.meta.env.MODE,

  IS_DEVELOPMENT:
    import.meta.env.DEV,

  IS_PRODUCTION:
    import.meta.env.PROD,
};

export default env;

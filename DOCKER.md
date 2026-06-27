# Docker

Build and run the production frontend:

```sh
docker compose up --build
```

The app is served at `http://localhost:8080` by default.

Vite reads API settings at build time. Override the backend origin when building:

```sh
VITE_API_URL=http://localhost:5000 FRONTEND_PORT=8080 docker compose up --build
```

Use the API origin only, not the `/api` path. The frontend appends Swagger paths such as `/api/v1/Products`.

For Vite development in Docker:

```sh
docker compose -f docker-compose.dev.yml up --build
```

The dev server is served at `http://localhost:5173` by default.

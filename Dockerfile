# Multi-stage build for the IFC Daylight Factor documentation site.

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencies first so the layer is cached when only content changes.
COPY package*.json ./
RUN npm ci

COPY . .

# Static output in /app/build.
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# The docs have their own hostname (baseUrl '/'), so the build is the web root.
COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Scaleway Serverless Containers route to the port declared on the container;
# 8080 is the convention across our images.
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# Multi-stage build for IFC Daylight Factor Documentation

# Stage 1: Build
FROM node:21-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci
    
# Copy source code
COPY . .

# Build the static site
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built static files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

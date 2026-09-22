---
sidebar_position: 11
---

# Building Docker Images

Build custom Docker images for LUX microservices.

## Prerequisites

- Docker 20.10+
- Docker Buildx (included in Docker Desktop)
- GCP access for pushing to Artifact Registry (optional)

## Repository Structure

Each microservice has its own Dockerfile in the service directory:

```
server_lux/
├── services/
│   ├── colormanage/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── daylight/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── encoder/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── obstruction/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── postprocess/
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── metrics/
│       ├── Dockerfile
│       └── requirements.txt
└── docker-compose.yml
```

## Build Single Service

### Local Build

```bash
cd server_lux

# Build encoder service
docker build -t daylight-encoder:local services/encoder/

# Build with specific tag
docker build -t daylight-encoder:v1.0.0 services/encoder/
```

### Build with BuildKit

```bash
export DOCKER_BUILDKIT=1

docker build \
  --platform linux/amd64 \
  -t daylight-encoder:local \
  services/encoder/
```

### Multi-platform Build

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t daylight-encoder:latest \
  services/encoder/
```

## Build All Services

Using docker-compose:

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build encoder

# Build with no cache
docker-compose build --no-cache

# Build in parallel
docker-compose build --parallel
```

Using shell script:

```bash
#!/bin/bash

services=("colormanage" "daylight" "encoder" "obstruction" "postprocess" "metrics")

for service in "${services[@]}"; do
  echo "Building $service..."
  docker build -t daylight-$service:local services/$service/
done
```

## Push to GCP Artifact Registry

### Setup

```bash
# Authenticate
gcloud auth login
gcloud auth configure-docker europe-north2-docker.pkg.dev

# Set project
gcloud config set project daylight-factor
```

### Tag and Push

```bash
# Tag image
docker tag daylight-encoder:local \
  europe-north2-docker.pkg.dev/daylight-factor/daylight-server-docker-repo/daylight-encoder-img:v1.0.0

# Push to registry
docker push \
  europe-north2-docker.pkg.dev/daylight-factor/daylight-server-docker-repo/daylight-encoder-img:v1.0.0
```

### Push All Services

```bash
#!/bin/bash

VERSION="v1.0.0"
REGISTRY="europe-north2-docker.pkg.dev/daylight-factor/daylight-server-docker-repo"

services=(
  "colormanage:daylight-colormanage-img"
  "daylight:daylight-model-img"
  "encoder:daylight-encoder-img"
  "obstruction:daylight-obstruction-img"
  "postprocess:daylight-postprocess-img"
  "metrics:daylight-metrics-img"
)

for entry in "${services[@]}"; do
  IFS=':' read -r service image <<< "$entry"

  echo "Building and pushing $service..."

  docker build -t $service:$VERSION services/$service/
  docker tag $service:$VERSION $REGISTRY/$image:$VERSION
  docker tag $service:$VERSION $REGISTRY/$image:latest

  docker push $REGISTRY/$image:$VERSION
  docker push $REGISTRY/$image:latest
done
```

## Dockerfile Structure

Typical microservice Dockerfile:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Run application
CMD ["python", "server.py"]
```

## Optimize Image Size

### Multi-stage Build

```dockerfile
# Build stage
FROM python:3.11 as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.11-slim

WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
EXPOSE 8080
CMD ["python", "server.py"]
```

### Minimize Layers

Combine RUN commands:

```dockerfile
RUN apt-get update && \
    apt-get install -y build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir -r requirements.txt
```

### Use .dockerignore

Create `.dockerignore`:

```
__pycache__/
*.pyc
*.pyo
.git/
.pytest_cache/
*.md
tests/
docs/
```

## Testing Images

### Local Test

```bash
# Run container
docker run -p 8080:8080 daylight-encoder:local

# Test endpoint
curl http://localhost:8080/

# Run with environment variables
docker run -p 8080:8080 \
  -e API_TOKEN=test \
  daylight-encoder:local
```

### Test with docker-compose

Override image in `docker-compose.override.yml`:

```yaml
version: '3.8'

services:
  encoder:
    image: daylight-encoder:local
    build:
      context: ./services/encoder

  obstruction:
    image: daylight-obstruction:local
    build:
      context: ./services/obstruction
```

Run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Images

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Authenticate to GCP
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}

      - name: Configure Docker
        run: gcloud auth configure-docker europe-north2-docker.pkg.dev

      - name: Build and push
        run: |
          VERSION=${GITHUB_REF#refs/tags/}
          docker build -t europe-north2-docker.pkg.dev/.../daylight-encoder-img:$VERSION services/encoder/
          docker push europe-north2-docker.pkg.dev/.../daylight-encoder-img:$VERSION
```

## Troubleshooting

### Build fails with memory error

Increase Docker memory:

```bash
# Docker Desktop: Settings → Resources → Memory → 8GB
```

### Slow builds

Enable BuildKit:

```bash
export DOCKER_BUILDKIT=1
```

Use build cache:

```bash
docker build --cache-from daylight-encoder:latest -t daylight-encoder:new .
```

### Layer caching not working

Order Dockerfile commands from least to most frequently changed:

```dockerfile
# System packages (rarely change)
RUN apt-get update && apt-get install -y build-essential

# Dependencies (occasionally change)
COPY requirements.txt .
RUN pip install -r requirements.txt

# Application code (frequently changes)
COPY . .
```

### Image too large

Check layer sizes:

```bash
docker history daylight-encoder:local
```

Use slim base image:

```dockerfile
FROM python:3.11-slim  # ~150MB vs python:3.11 ~900MB
```

Remove build dependencies:

```dockerfile
RUN apt-get update && \
    apt-get install -y build-essential && \
    pip install -r requirements.txt && \
    apt-get remove -y build-essential && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

## Version Management

### Semantic Versioning

Tag images with semantic versions:

```bash
# Major.Minor.Patch
docker tag encoder:latest encoder:v2.1.3

# Also tag as latest minor
docker tag encoder:latest encoder:v2.1

# Also tag as latest major
docker tag encoder:latest encoder:v2
```

### Git-based Versioning

Use git commit hash:

```bash
GIT_HASH=$(git rev-parse --short HEAD)
docker build -t daylight-encoder:$GIT_HASH services/encoder/
```

Use git tags:

```bash
GIT_TAG=$(git describe --tags --always)
docker build -t daylight-encoder:$GIT_TAG services/encoder/
```

## Next Steps

[Docker Setup](/api/docker-setup) - Run images locally

[Deployment Guide](/contributing/servers) - Production deployment

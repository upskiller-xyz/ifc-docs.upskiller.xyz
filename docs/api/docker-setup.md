---
sidebar_position: 9
---

# Docker Setup

Run LUX locally using Docker.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Option 1: Docker Compose (Recommended)

Download the compose file and Dockerfile from the repository:

```bash
mkdir lux-deployment
cd lux-deployment

# Download Dockerfile
curl -O https://raw.githubusercontent.com/upskiller-xyz/server_lux/master/Dockerfile

# Create deployment directory
mkdir deployment

# Download docker-compose file
curl -o deployment/docker-compose-full-stack.yml \
  https://raw.githubusercontent.com/upskiller-xyz/server_lux/master/deployment/docker-compose-full-stack.yml
```

Start services:

```bash
docker-compose -f deployment/docker-compose-full-stack.yml up -d
```

### Option 2: Pre-built Docker Image

Pull and run the image:

```bash
# Docker image URL will be provided
docker pull <IMAGE_URL>
docker run -p 8080:8080 <IMAGE_URL>
```

### Option 3: Clone and Deploy

Clone the repository and run the deployment script:

```bash
git clone https://github.com/upskiller-xyz/server_lux.git
cd server_lux
bash deployment/deploy-full-stack.sh
```

## Verify Deployment

Check server status:

```bash
curl http://localhost:8080/
```

Expected response:

```json
{
  "status": "running",
  "services": {
    "encoder": "ready",
    "merger": "ready",
    "model": "ready",
    "obstruction": "ready",
    "stats": "ready"
  }
}
```

## Service Ports

When running locally, services are available at:

| Service      | Port | URL                   |
| ------------ | ---- | --------------------- |
| Main Gateway | 8080 | http://localhost:8080 |
| Obstruction  | 8081 | http://localhost:8081 |
| Encoder      | 8082 | http://localhost:8082 |
| Model        | 8083 | http://localhost:8083 |
| Merger       | 8084 | http://localhost:8084 |
| Stats        | 8085 | http://localhost:8085 |

## Common Operations

### View Logs

```bash
docker-compose -f deployment/docker-compose-full-stack.yml logs -f
```

### Stop Services

```bash
docker-compose -f deployment/docker-compose-full-stack.yml down
```

### Restart Services

```bash
docker-compose -f deployment/docker-compose-full-stack.yml restart
```

## Troubleshooting

### Port Conflicts

If ports are already in use, modify port mappings in `docker-compose-full-stack.yml`:

```yaml
ports:
  - '9080:8080' # Change left side to different port
```

### Services Not Communicating

Verify all containers are on the same network:

```bash
docker network ls
docker network inspect deployment_lux-network
```

### Rebuild After Changes

```bash
docker-compose -f deployment/docker-compose-full-stack.yml build --no-cache
docker-compose -f deployment/docker-compose-full-stack.yml up -d
```

## Microservices

See [Microservices Architecture](/contributing/microservices) for detailed information about each service.

## Next Steps

[API Reference](./api-reference) - Complete endpoint documentation

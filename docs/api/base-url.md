---
sidebar_position: 4
---

# Base URL

All API requests use this versioned base URL:

```
https://api-lux.upskiller.xyz/v1
```

Where `v1` is the [current API version](./api_version).

## Example

Full URL for the `/run` endpoint:

```
https://api-lux.upskiller.xyz/v2/run
```

## Versioning

The API follows semantic versioning (semver). Major version changes (v1 → v2) indicate breaking changes. See [API Versioning](./api_version) for details.

## Local Deployment

When running a local instance, replace the base URL with your deployment address:

```
http://localhost:8080/v1
```

See [Docker Setup](./docker-setup) for local deployment instructions.

---
sidebar_position: 7
---

# API Versioning

The LUX API uses semantic versioning in the URL path:

```
https://api-lux.upskiller.xyz/v{MAJOR}
```

## Current Version

**v1** - Current stable version

All endpoints are accessed via:
```
https://api-lux.upskiller.xyz/v2/{endpoint}
```

## Version History

| Version | Status | Release Date | Deprecation Date |
|---------|--------|--------------|------------------|
| v1 | Internal | To be announced | - |

## Semantic Versioning

The API follows [semantic versioning](https://semver.org/) principles:

**Major version** (v1 → v2): Breaking changes
- Removal of documented endpoints
- Changes to required parameters
- Changes to response format or structure
- Changes to authentication method

**Minor changes**: Non-breaking improvements (not reflected in URL)
- Addition of new optional parameters
- Addition of new endpoints
- Addition of new fields in responses
- Performance improvements
- Bug fixes

## Breaking Change Policy

Breaking changes require a new major version. When a new major version is released:

1. **Announcement**: 90 days advance notice via email and GitHub
2. **Deprecation**: Old version marked as deprecated but remains functional
3. **Sunset**: Minimum 180 days from deprecation before version is disabled
4. **Migration Guide**: Detailed documentation provided for upgrading

## Version Support

Each major version is supported for a minimum of 1 year after the next major version is released.

## Migration Notices

Users will receive notice through:

- Email notifications to API token holders
- [GitHub repository](https://github.com/upskiller-xyz/Lux) announcements
- Documentation changelog
- Deprecation headers in API responses

## Checking API Version

Health check endpoint returns current version:

```bash
curl https://api-lux.upskiller.xyz/v2/
```

Response:
```json
{
  "status": "ok",
  "service": "lux-api",
  "version": "1.0.0",
  "api_version": "v1"
}
```

## Changelog

Changes to the API are published in the [GitHub repository](https://github.com/upskiller-xyz/Lux/releases).

---
sidebar_position: 6
---

# Response Format

## Content Types

The `/run` endpoint returns JSON:

```http
Content-Type: application/json
```

## Success Response

JSON object containing simulation results:

```json
{
  "status": "success",
  "result": [[/* df values array */]],
  "mask": [[/*bool mask showing the room boundary*/]]
}
```

Example response headers:
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 524288
```

## Error Response

All errors return JSON with an error message:

```json
{
  "status": "error",
  "error": "Error message description"
}
```

### Common Error Responses

**Missing required field** (400 Bad Request):
```json
{
  "error": "Missing required parameters: window_frame_ratio"
}
```

**Out of range value** (400 Bad Request):
```json
{
  "error": "Parameter 'height_roof_over_floor' value 35.0 outside valid range [0, 30]"
}
```

**Invalid authentication** (401 Unauthorized):
```json
{
  "error": "Invalid or missing API token"
}
```

**Internal error** (500 Internal Server Error):
```json
{
  "error": "Simulation failed: unable to process room geometry"
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success - returns simulation results |
| 400 | Invalid parameters or missing required fields |
| 401 | Missing or invalid API token |
| 500 | Internal server error |
| 503 | Service unavailable |
| 504 | Request timeout |

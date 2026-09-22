---
sidebar_position: 5
---

# Servers

## Test Server

Tests hypotheses about system performance and user experience. Repository: [server_test](https://github.com/upskiller-xyz/server_test)

### Current Hypothesis: "What to Send"

**Question** - How much data can we send without affecting user experience?

**Target** - ≤2 seconds response time

<!-- See test results: [What to send](./bim-simplification.md#what-to-send) -->

### Test Endpoint

**POST** `/upload`

Accepts file uploads via multipart/form-data. Tracks upload time and file size metrics. Returns JSON with timing data.

**Response**:

```json
{
  "filename": "example.txt",
  "content_type": "text/plain",
  "file_size_bytes": 1048576,
  "file_size_mb": 1.0,
  "upload_time_seconds": 0.0234,
  "upload_time_ms": 23.4
}
```

Use this endpoint for quick hypothesis testing.

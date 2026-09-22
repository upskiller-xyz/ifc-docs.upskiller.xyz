---
sidebar_position: 5
---

# Authentication

All requests to the hosted LUX API require authentication using an API token.

## Getting a Token

Join the [beta program](https://docs.google.com/forms/d/19p6IUGgH7YBV7W9smQDx1ISpL2WiRiKaHgJDGndTj1M) to request access and obtain your API token.

## Passing Authorization in Requests

Authentication is supplied as a standard `Authorization` HTTP header using the Bearer scheme:

```http
Authorization: Bearer YOUR_API_TOKEN
```

## Example Request

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl" default>

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/run \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"model_type": "df_default", "parameters": {...}}'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://api-lux.upskiller.xyz/v2/run",
    headers=headers,
    json={"model_type": "df_default", "parameters": {...}}
)
```

</TabItem>
</Tabs>

## Self-Hosted Deployment

Local deployments do not require authentication. Remove the `Authorization` header when connecting to self-hosted instances.

## Error Response

Missing or invalid token returns `401 Unauthorized`:

```json
{
  "error": "Invalid or missing API token"
}
```

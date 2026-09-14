---
sidebar_position: 1
---

# LUX API Overview

The LUX API converts room geometry into encoded images for machine learning-based daylight predictions. Send room parameters via HTTP, receive encoded visualizations for Daylight Factor (DF) or Daylight Autonomy (DA) analysis.

## Pricing

**Commercial (Hosted)**: Using `https://api-lux.upskiller.xyz/v1` requires an API token and is subject to usage fees.

**Free (Self-Hosted)**: Deploy locally at no cost. See [Docker Setup](./docker-setup) for setup instructions.

## Authentication

All requests to the hosted API require an API token.

```http
Authorization: Bearer YOUR_API_TOKEN
```

Join the [beta program](https://docs.google.com/forms/d/19p6IUGgH7YBV7W9smQDx1ISpL2WiRiKaHgJDGndTj1M) to obtain an API token.

## Base URL

```
https://api-lux.upskiller.xyz/v1
```

## Quick Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/run"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN"
}
payload = {
    "model_type": "df_default",
    "parameters": {
        "height_roof_over_floor": 2.7,
        "floor_height_above_terrain": 3.0,
        "room_polygon": [[0, 0], [5, 0], [5, 4], [0, 4]],
        "windows": {
            "main_window": {
                "x1": -0.6, "y1": 0.0, "z1": 0.9,
                "x2": 0.6, "y2": 0.0, "z2": 2.4,
                "window_frame_ratio": 0.15
            }
        }
    },
    "mesh": [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    result = response.json()
    print(f"Status: {result['status']}")
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -d '{
    "model_type": "df_default",
    "parameters": {
      "height_roof_over_floor": 2.7,
      "floor_height_above_terrain": 3.0,
      "room_polygon": [[0, 0], [5, 0], [5, 4], [0, 4]],
      "windows": {
        "main_window": {
          "x1": -0.6, "y1": 0.0, "z1": 0.9,
          "x2": 0.6, "y2": 0.0, "z2": 2.4,
          "window_frame_ratio": 0.15
        }
      }
    },
    "mesh": [
      [10, 0, 0], [10, 0, 8], [10, 20, 8],
      [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
  }'
```

</TabItem>
</Tabs>

## Available Endpoints

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| run | POST /run | Converts room geometry into encoded images for daylight prediction |
| horizon | POST /horizon | Calculates horizon obstruction angle from window position |
| zenith | POST /zenith | Calculates zenith obstruction angle from window position |
| obstruction | POST /obstruction | Calculates both horizon and zenith obstruction angles |

## Simulation Modes

Choose a model type based on your analysis needs:

| Model Type | Analysis | Materials |
|------------|----------|-----------|
| `df_default` | Daylight Factor | Fixed per-surface reflectances |
| `da_default` | Daylight Autonomy | Fixed per-surface reflectances |
| `df_custom` | Daylight Factor | Custom material reflectances |
| `da_custom` | Daylight Autonomy | Custom material reflectances |

## Response Format

Returns JSON with daylight factor matrix and room mask.

## Use Cases

Batch analyze apartments in multi-unit buildings. Automate compliance checks for SS-EN 17037 or other building codes. Integrate into parametric design workflows. Generate custom daylight visualizations. Conduct parametric studies on room or window configurations.

## Rate Limits

Hosted API has no enforced rate limits currently. Subject to change as service scales. Self-hosted deployments have no restrictions.

## Next Steps

[API Reference](./api-reference) - Complete endpoint documentation

[Required Parameters](/docs/ifc-daylight-factor/methodology/parameters) - Parameter specifications

[Simulation Modes](/docs/ifc-daylight-factor/methodology/simulation-modes) - Detailed mode explanations

[Local Deployment](../contributing/servers) - Self-hosting instructions

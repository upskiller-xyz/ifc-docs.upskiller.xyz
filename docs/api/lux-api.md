---
sidebar_position: 8
---

# LUX API Endpoints

The LUX API provides endpoints for daylight simulation and server health monitoring.

## Quick Start

1. Join the [beta program](https://docs.google.com/forms/d/19p6IUGgH7YBV7W9smQDx1ISpL2WiRiKaHgJDGndTj1M) to obtain an API token
2. Call the API endpoints using Bearer authentication

## Pricing

**Commercial (Hosted)**: Using `https://api-lux.upskiller.xyz/v1` requires an API token and is subject to usage fees.

**Free (Self-Hosted)**: Deploy locally at no cost. See [deployment guide](../contributing/servers).

## Endpoints

### Health Check

#### `GET /`

Check server health and availability.

**Request**

```http
GET https://api-lux.upskiller.xyz/v2/
```

**Response**

```json
{
  "status": "ok",
  "service": "lux-api",
  "version": "1.0.0"
}
```

**No authentication required** for health check endpoint.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl" default>

```bash
curl https://api-lux.upskiller.xyz/v2/
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get("https://api-lux.upskiller.xyz/v2/")
print(response.json())
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch('https://api-lux.upskiller.xyz/v2/')
  .then(response => response.json())
  .then(data => console.log(data));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
var response = await client.GetAsync("https://api-lux.upskiller.xyz/v2/");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```

</TabItem>
</Tabs>

---

### Calculate Horizon Angle

#### `POST /horizon`

Calculate the horizon angle - the angle measured upward from horizontal to the highest obstruction point.

**Authentication Required**: Include `Authorization: Bearer YOUR_API_TOKEN` header.

**Request Body**

```json
{
  "x": 0.0,
  "y": 3.0,
  "z": 0.0,
  "rad_x": 0.0,
  "rad_y": 0.0,
  "mesh": [
    [10.0, 0.0, -5.0],
    [10.0, 5.0, -5.0],
    [10.0, 0.0, 5.0]
  ]
}
```

**Response**

```json
{
  "status": "success",
  "data": {
    "obstruction_angle_degrees": 11.31,
    "obstruction_angle_radians": 0.1974,
    "highest_point": {
      "x": 10.0,
      "y": 5.0,
      "z": -5.0
    },
    "projected_point_count": 6
  }
}
```

See [API Reference](./api-reference#post-horizon) for complete parameter specifications.

---

### Calculate Zenith Angle

#### `POST /zenith`

Calculate the zenith angle - the angle measured downward from vertical to the lowest overhead obstruction point.

**Authentication Required**: Include `Authorization: Bearer YOUR_API_TOKEN` header.

**Request Body**

Same parameters as `/horizon` endpoint.

**Response**

```json
{
  "status": "success",
  "data": {
    "obstruction_angle_degrees": 51.34,
    "obstruction_angle_radians": 0.8961,
    "highest_point": {
      "x": 5.0,
      "y": 7.0,
      "z": -2.0
    },
    "projected_point_count": 6
  }
}
```

See [API Reference](./api-reference#post-zenith) for complete parameter specifications.

---

### Calculate Both Angles

#### `POST /obstruction`

Calculate both horizon and zenith angles in a single request.

**Authentication Required**: Include `Authorization: Bearer YOUR_API_TOKEN` header.

**Request Body**

Same parameters as individual angle endpoints.

**Response**

```json
{
  "status": "success",
  "data": {
    "horizon": {
      "obstruction_angle_degrees": 11.31,
      "obstruction_angle_radians": 0.1974,
      "highest_point": {...},
      "projected_point_count": 6
    },
    "zenith": {
      "obstruction_angle_degrees": 78.69,
      "obstruction_angle_radians": 1.3734,
      "highest_point": {...},
      "projected_point_count": 6
    }
  }
}
```

See [API Reference](./api-reference#post-obstruction) for complete parameter specifications.

---

### Execute Daylight Simulation

#### `POST /run`

Executes daylight simulation from room geometry and obstruction mesh.

**Authentication Required**: Include `Authorization: Bearer YOUR_API_TOKEN` header.

**Request Body**

```json
{
  "model_type": "df_default" | "da_default" | "df_custom" | "da_custom",
  "parameters": {
    "height_roof_over_floor": 2.7,
    "floor_height_above_terrain": 3.0,
    "room_polygon": [[0, 0], [5, 0], [5, 4], [0, 4]],
    "windows": {
      "window_id": {
        "x1": -0.6, "y1": 0.0, "z1": 0.9,
        "x2": 0.6, "y2": 0.0, "z2": 2.4,
        "window_frame_ratio": 0.15
      }
    }
  },
  "mesh": [
    [10, 0, 0],
    [10, 0, 5],
    [10, 10, 5],
    [10, 10, 0]
  ]
}
```

**Response**

JSON object containing simulation results with base64-encoded numpy array and shape information.

See [Parameters](https://docs.upskiller.xyz/docs/lux-live/methodology/parameters) for complete parameter specifications and [API Reference](./api-reference) for detailed documentation.

**Example Requests**

<Tabs>
<TabItem value="curl" label="curl" default>

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
      [10, 0, 0],
      [10, 0, 5],
      [10, 10, 5],
      [10, 10, 0]
    ]
  }'
```

</TabItem>
<TabItem value="python" label="Python">

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
        [10, 0, 0],
        [10, 0, 5],
        [10, 10, 5],
        [10, 10, 0]
    ]
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    result = response.json()
    print(f"Simulation complete. Result shape: {result['shape']}")
else:
    print(f"Error: {response.json()}")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

const url = "https://api-lux.upskiller.xyz/v2/run";
const payload = {
    model_type: "df_default",
    parameters: {
        height_roof_over_floor: 2.7,
        floor_height_above_terrain: 3.0,
        room_polygon: [[0, 0], [5, 0], [5, 4], [0, 4]],
        windows: {
            main_window: {
                x1: -0.6, y1: 0.0, z1: 0.9,
                x2: 0.6, y2: 0.0, z2: 2.4,
                window_frame_ratio: 0.15
            }
        }
    },
    mesh: [
        [10, 0, 0], [10, 0, 5], [10, 10, 5], [10, 10, 0]
    ]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN'
    },
    body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => console.log(`Status: ${data.status}`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");
var url = "https://api-lux.upskiller.xyz/v2/run";

var payload = new {
    model_type = "df_default",
    parameters = new {
        height_roof_over_floor = 2.7,
        floor_height_above_terrain = 3.0,
        room_polygon = new[] { new[] { 0, 0 }, new[] { 5, 0 }, new[] { 5, 4 }, new[] { 0, 4 } },
        windows = new {
            main_window = new {
                x1 = -0.6, y1 = 0.0, z1 = 0.9,
                x2 = 0.6, y2 = 0.0, z2 = 2.4,
                window_frame_ratio = 0.15
            }
        }
    },
    mesh = new[] {
        new[] { 10, 0, 0 },
        new[] { 10, 0, 5 },
        new[] { 10, 10, 5 },
        new[] { 10, 10, 0 }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync(url, content);

if (response.IsSuccessStatusCode) {
    var result = await response.Content.ReadAsStringAsync();
    Console.WriteLine(result);
}
```

</TabItem>
</Tabs>



See complete schema: [Request Schema](https://github.com/upskiller-xyz/server_encoder/blob/main/docs/request_schema)


## Error Responses

All endpoints return JSON errors with appropriate status codes:

```json
{
  "error": "Error message description"
}
```

See [Response Format](./response-format) for detailed error documentation.

## Rate Limits

Hosted API has no enforced rate limits currently. Subject to change as service scales.

## Next Steps

[API Reference](./api-reference) - Complete parameter documentation

[Authentication](./authentication) - Detailed authentication guide

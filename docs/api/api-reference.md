---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API Reference

Base URL: `https://api-lux.upskiller.xyz/v2`

All endpoints except health check require authentication. Include `Authorization: Bearer YOUR_API_TOKEN` in request headers.

Complete API documentation with request/response schemas: [Swagger UI](https://api-lux.upskiller.xyz/docs/)

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| / | GET | Server health check |
| /run | POST | End-to-end daylight simulation |
| /obstruction_all | POST | Calculate obstruction angles in 64 directions |
| /horizon | POST | Calculate single horizon angle |
| /zenith | POST | Calculate single zenith angle |
| /obstruction | POST | Calculate both horizon and zenith for one direction |
| /get-reference-point | POST | Get window center point |
| /calculate-direction | POST | Get window normal direction |
| /encode | POST | Encode room parameters to model input |
| /encode_raw | POST | Encode with pre-calculated angles |
| /stats | POST | Calculate daylight statistics |
| /merge | POST | Merge multiple window results |

---

## GET /

Check server status.

**Request**

```http
GET https://api-lux.upskiller.xyz/v2/
```

No authentication required.

**Response**

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

**Example**

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
  .then(res => res.json())
  .then(data => console.log(data));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;

var client = new HttpClient();
var response = await client.GetAsync("https://api-lux.upskiller.xyz/v2/");
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
```

</TabItem>
</Tabs>

---

## POST /run

Executes complete daylight simulation: obstruction calculation, encoding, and model prediction.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| model_type | string | `df_default`, `da_default`, `df_custom`, or `da_custom` |
| parameters | object | Room and window geometry |
| mesh | array | Triangle mesh. Each 3 consecutive `[x, y, z]` points form a triangle |
| horizon | array | (Optional) Pre-calculated horizon angles (64 floats). Can be at top level or per-window |
| zenith | array | (Optional) Pre-calculated zenith angles (64 floats). Can be at top level or per-window |

When both `horizon` and `zenith` are provided, obstruction calculation is skipped, improving performance by 30-50%.

**Parameters Object**

<details>
<summary>Required properties</summary>

| Property | Type | Range | Unit | Description |
|----------|------|-------|------|-------------|
| height_roof_over_floor | float | 0-30 | m | Floor to ceiling distance |
| floor_height_above_terrain | float | 0-10 | m | Floor elevation above ground |
| room_polygon | array | - | m | Room outline as `[[x, y], ...]` coordinate pairs |
| windows | object | - | - | Window definitions keyed by ID |

</details>

<details>
<summary>Optional properties</summary>

| Property | Type | Range | Description |
|----------|------|-------|-------------|
| ceiling_reflectance | float | 0.50-0.90 | Light reflectance of ceiling (default 0.80) |
| horizontal_reflectance | float | 0.05-0.60 | Light reflectance of floor (default 0.30) |
| vertical_reflectance | float | 0.30-0.90 | Light reflectance of walls (default 0.70) |
| facade_reflectance | float | 0.10-0.60 | Light reflectance of facade (default 0.30) |
| terrain_reflectance | float | 0.05-0.40 | Light reflectance of ground (default 0.20) |

</details>

**Window Object**

<details>
<summary>Required properties per window</summary>

| Property | Type | Range | Unit | Description |
|----------|------|-------|------|-------------|
| x1, y1, z1 | float | - | m | First corner of window bounding box |
| x2, y2, z2 | float | - | m | Opposite corner of window bounding box |
| window_frame_ratio | float | 0-1 | - | Fraction of window occupied by frame |

</details>

<details>
<summary>Optional properties per window</summary>

| Property | Type | Description |
|----------|------|-------------|
| horizon | array | Pre-calculated horizon angles (64 floats) for this window |
| zenith | array | Pre-calculated zenith angles (64 floats) for this window |

When specified per-window, these override top-level values for that specific window.

</details>

**Request Example (Basic)**

```json
{
  "model_type": "df_default",
  "parameters": {
    "height_roof_over_floor": 2.7,
    "floor_height_above_terrain": 0.5,
    "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
    "windows": {
      "main_window": {
        "x1": -0.5, "y1": 5, "z1": 0.9,
        "x2": -2, "y2": 5.2, "z2": 2.4,
        "window_frame_ratio": 0.2
      }
    }
  },
  "mesh": [
    [10, 0, 0], [10, 0, 8], [10, 20, 8],
    [10, 20, 8], [10, 20, 0], [10, 0, 0]
  ]
}
```

<details>
<summary>Request Example with Pre-calculated Obstruction Angles</summary>

Skip obstruction calculation by providing `horizon` and `zenith` arrays at the top level:

```json
{
  "model_type": "df_default",
  "parameters": {
    "height_roof_over_floor": 2.7,
    "floor_height_above_terrain": 0.5,
    "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
    "windows": {
      "main_window": {
        "x1": -0.5, "y1": 5, "z1": 0.9,
        "x2": -2, "y2": 5.2, "z2": 2.4,
        "window_frame_ratio": 0.2
      }
    }
  },
  "mesh": [
    [10, 0, 0], [10, 0, 8], [10, 20, 8],
    [10, 20, 8], [10, 20, 0], [10, 0, 0]
  ],
  "horizon": [15.5, 16.2, 14.8, /* ... 64 values total */],
  "zenith": [10.2, 11.1, 9.8, /* ... 64 values total */]
}
```

Or specify per-window for multi-window scenarios:

```json
{
  "model_type": "df_default",
  "parameters": {
    "height_roof_over_floor": 2.7,
    "floor_height_above_terrain": 0.5,
    "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
    "windows": {
      "window_1": {
        "x1": -0.5, "y1": 5, "z1": 0.9,
        "x2": -2, "y2": 5.2, "z2": 2.4,
        "window_frame_ratio": 0.2,
        "horizon": [30, 30, /* ... 64 values */],
        "zenith": [30, 30, /* ... 64 values */]
      },
      "window_2": {
        "x1": 0, "y1": 1, "z1": 0.9,
        "x2": 0.4, "y2": 4, "z2": 2.4,
        "window_frame_ratio": 0.2,
        "horizon": [0, 0, /* ... 64 values */],
        "zenith": [0, 0, /* ... 64 values */]
      }
    }
  },
  "mesh": [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
}
```

</details>

**Response**

```json
{
  "status": "success",
  "result": [[/* df values array */]],
  "mask": [[/*bool mask showing the room boundary*/]]
}
```

[Sample response JSON](https://github.com/upskiller-xyz/server_merger/blob/v2/assets/result.json)

**Example**

<Tabs>
<TabItem value="curl" label="curl" default>

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/run \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model_type": "df_default",
    "parameters": {
      "height_roof_over_floor": 2.7,
      "floor_height_above_terrain": 0.5,
      "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
      "windows": {
        "main_window": {
          "x1": -0.5, "y1": 5, "z1": 0.9,
          "x2": -2, "y2": 5.2, "z2": 2.4,
          "window_frame_ratio": 0.2
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
<TabItem value="python" label="Python">

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/run"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "model_type": "df_default",
    "parameters": {
        "height_roof_over_floor": 2.7,
        "floor_height_above_terrain": 0.5,
        "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
        "windows": {
            "main_window": {
                "x1": -0.5, "y1": 5, "z1": 0.9,
                "x2": -2, "y2": 5.2, "z2": 2.4,
                "window_frame_ratio": 0.2
            }
        }
    },
    "mesh": [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Status: {result['status']}")
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
        floor_height_above_terrain: 0.5,
        room_polygon: [[0, 0], [0, 5], [-4, 5], [-4, 0]],
        windows: {
            main_window: {
                x1: -0.5, y1: 5, z1: 0.9,
                x2: -2, y2: 5.2, z2: 2.4,
                window_frame_ratio: 0.2
            }
        }
    },
    mesh: [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(`Status: ${data.status}`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    model_type = "df_default",
    parameters = new {
        height_roof_over_floor = 2.7,
        floor_height_above_terrain = 0.5,
        room_polygon = new[] {
            new[] { 0, 0 }, new[] { 0, 5 },
            new[] { -4, 5 }, new[] { -4, 0 }
        },
        windows = new {
            main_window = new {
                x1 = -0.5, y1 = 5, z1 = 0.9,
                x2 = -2, y2 = 5.2, z2 = 2.4,
                window_frame_ratio = 0.2
            }
        }
    },
    mesh = new[] {
        new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 },
        new[] { 10, 20, 8 }, new[] { 10, 20, 0 }, new[] { 10, 0, 0 }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/run", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
</Tabs>

---

## POST /obstruction_all

Calculates horizon and zenith angles in 64 directions around a window.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| room_polygon | array | Room outline as `[[x, y], ...]` coordinate pairs |
| windows | object | Window definitions (same format as `/run`) |
| mesh | array | Triangle mesh as `[x, y, z]` points |

The endpoint calculates reference points and direction angles automatically from window geometry.

**Response**

```json
{
  "status": "success",
  "horizon": [/* 64 angles in degrees */],
  "zenith": [/* 64 angles in degrees */]
}
```

**Example**

<Tabs>
<TabItem value="curl" label="curl" default>

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/obstruction_all \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "room_polygon": [[0, 0], [0, 7], [-3, 7], [-3, 0]],
    "windows": {
      "window_1": {
        "x1": -1.0,
        "y1": 7,
        "z1": 2.8,
        "x2": -2,
        "y2": 7.3,
        "z2": 5.4,
        "window_frame_ratio": 0.41
      }
    },
    "mesh": [
      [10, 0, 0], [10, 0, 8], [10, 20, 8],
      [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/obstruction_all"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "room_polygon": [[0, 0], [0, 7], [-3, 7], [-3, 0]],
    "windows": {
        "window_1": {
            "x1": -1.0,
            "y1": 7,
            "z1": 2.8,
            "x2": -2,
            "y2": 7.3,
            "z2": 5.4,
            "window_frame_ratio": 0.41
        }
    },
    "mesh": [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Horizon angles: {result['horizon'][:3]}...")
print(f"Zenith angles: {result['zenith'][:3]}...")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

const url = "https://api-lux.upskiller.xyz/v2/obstruction_all";
const payload = {
    room_polygon: [[0, 0], [0, 7], [-3, 7], [-3, 0]],
    windows: {
        window_1: {
            x1: -1.0,
            y1: 7,
            z1: 2.8,
            x2: -2,
            y2: 7.3,
            z2: 5.4,
            window_frame_ratio: 0.41
        }
    },
    mesh: [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(`Got ${data.horizon.length} angles`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    room_polygon = new[] {
        new[] { 0, 0 }, new[] { 0, 7 },
        new[] { -3, 7 }, new[] { -3, 0 }
    },
    windows = new {
        window_1 = new {
            x1 = -1.0, y1 = 7, z1 = 2.8,
            x2 = -2, y2 = 7.3, z2 = 5.4,
            window_frame_ratio = 0.41
        }
    },
    mesh = new[] {
        new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 },
        new[] { 10, 20, 8 }, new[] { 10, 20, 0 }, new[] { 10, 0, 0 }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/obstruction_all", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
</Tabs>

---

## POST /horizon

Calculates single horizon obstruction angle for a specific direction.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| x | float | Window center X coordinate |
| y | float | Window center Y coordinate |
| z | float | Window center Z coordinate |
| direction_angle | float | Direction angle in degrees (0-360) |
| mesh | array | Triangle mesh |

**Response**

```json
{
  "status": "success",
  "horizon": 15.5
}
```

**Example**

<Tabs>
<TabItem value="curl" label="curl" default>

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/horizon \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "x": 0.0,
    "y": 3.0,
    "z": 1.5,
    "direction_angle": 90.0,
    "mesh": [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
  }'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/horizon"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "x": 0.0,
    "y": 3.0,
    "z": 1.5,
    "direction_angle": 90.0,
    "mesh": [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Horizon angle: {result['horizon']}°")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch("https://api-lux.upskiller.xyz/v2/horizon", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        x: 0.0,
        y: 3.0,
        z: 1.5,
        direction_angle: 90.0,
        mesh: [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
    })
})
.then(res => res.json())
.then(data => console.log(`Horizon angle: ${data.horizon}°`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    x = 0.0,
    y = 3.0,
    z = 1.5,
    direction_angle = 90.0,
    mesh = new[] {
        new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/horizon", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
</Tabs>

---

## POST /zenith

Calculates single zenith obstruction angle for a specific direction.

Request and response format identical to `/horizon`.

**Response**

```json
{
  "status": "success",
  "zenith": 10.2
}
```

---

## POST /obstruction

Calculates both horizon and zenith angles in a single request for a specific direction.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| x | float | Window center X coordinate |
| y | float | Window center Y coordinate |
| z | float | Window center Z coordinate |
| direction_angle | float | Direction angle in degrees (0-360) |
| mesh | array | Triangle mesh |

**Response**

```json
{
  "status": "success",
  "data": {
    "horizon": {
      "obstruction_angle_degrees": 26.57,
      "obstruction_angle_radians": 0.4636,
      "highest_point": {"x": 10.0, "y": 0.0, "z": 8.0},
      "projected_point_count": 6
    },
    "zenith": {
      "obstruction_angle_degrees": 56.31,
      "obstruction_angle_radians": 0.9828,
      "highest_point": {"x": 8.0, "y": 0.0, "z": 5.0},
      "projected_point_count": 6
    }
  }
}
```

[Sample response JSON](https://github.com/upskiller-xyz/server_lux/blob/deployment/assets/obstruction_response.json)

**Example**

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/obstruction"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "x": 0.0,
    "y": 3.0,
    "z": 1.5,
    "direction_angle": 90.0,
    "mesh": [
        [10, 0, 0], [10, 0, 8], [10, 20, 8],
        [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Horizon: {result['data']['horizon']['obstruction_angle_degrees']:.2f}°")
print(f"Zenith: {result['data']['zenith']['obstruction_angle_degrees']:.2f}°")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch("https://api-lux.upskiller.xyz/v2/obstruction", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        x: 0.0,
        y: 3.0,
        z: 1.5,
        direction_angle: 90.0,
        mesh: [
            [10, 0, 0], [10, 0, 8], [10, 20, 8],
            [10, 20, 8], [10, 20, 0], [10, 0, 0]
        ]
    })
})
.then(res => res.json())
.then(data => {
    console.log(`Horizon: ${data.data.horizon.obstruction_angle_degrees.toFixed(2)}°`);
    console.log(`Zenith: ${data.data.zenith.obstruction_angle_degrees.toFixed(2)}°`);
});
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    x = 0.0,
    y = 3.0,
    z = 1.5,
    direction_angle = 90.0,
    mesh = new[] {
        new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 },
        new[] { 10, 20, 8 }, new[] { 10, 20, 0 }, new[] { 10, 0, 0 }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/obstruction", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/obstruction \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "x": 0.0,
    "y": 3.0,
    "z": 1.5,
    "direction_angle": 90.0,
    "mesh": [
      [10, 0, 0], [10, 0, 8], [10, 20, 8],
      [10, 20, 8], [10, 20, 0], [10, 0, 0]
    ]
  }'
```

</TabItem>
</Tabs>

---

## POST /get-reference-point

Returns the center point (reference point) of each window for obstruction calculations.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| room_polygon | array | Room outline as `[[x, y], ...]` |
| windows | object | Window definitions |

**Response**

```json
{
  "status": "success",
  "windows": {
    "test_window": {
      "reference_point": {"x": -1.2, "y": 7.1, "z": 4.1}
    }
  }
}
```

**Example**

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/get-reference-point"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "room_polygon": [[0, 0], [0, 7], [-3, 7], [-3, 0]],
    "windows": {
        "test_window": {
            "x1": -2, "y1": 7, "z1": 2.8,
            "x2": -0.4, "y2": 7.2, "z2": 5.4
        }
    }
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(result['windows']['test_window']['reference_point'])
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch("https://api-lux.upskiller.xyz/v2/get-reference-point", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        room_polygon: [[0, 0], [0, 7], [-3, 7], [-3, 0]],
        windows: {
            test_window: {
                x1: -2, y1: 7, z1: 2.8,
                x2: -0.4, y2: 7.2, z2: 5.4
            }
        }
    })
})
.then(res => res.json())
.then(data => console.log(data.windows.test_window.reference_point));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    room_polygon = new[] {
        new[] { 0, 0 }, new[] { 0, 7 },
        new[] { -3, 7 }, new[] { -3, 0 }
    },
    windows = new {
        test_window = new {
            x1 = -2, y1 = 7, z1 = 2.8,
            x2 = -0.4, y2 = 7.2, z2 = 5.4
        }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/get-reference-point", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/get-reference-point \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "room_polygon": [[0, 0], [0, 7], [-3, 7], [-3, 0]],
    "windows": {
      "test_window": {
        "x1": -2, "y1": 7, "z1": 2.8,
        "x2": -0.4, "y2": 7.2, "z2": 5.4
      }
    }
  }'
```

</TabItem>
</Tabs>

---

## POST /calculate-direction

Calculates the outward normal direction angle for each window.

**Request Body**

Same format as `/get-reference-point`.

**Response**

```json
{
  "status": "success",
  "windows": {
    "test_window": {
      "direction_angle": 90.5
    }
  }
}
```

---

## POST /encode

Encodes room and window parameters into model input format (ZIP file with NPY arrays).

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| model_type | string | Model type (`df_default`, etc.) |
| parameters | object | Room and window geometry |
| mesh | array | Triangle mesh |

**Response**

Binary ZIP file containing `image.npy` (128×128 encoded array).

**Example**

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests
import zipfile
from io import BytesIO
import numpy as np

url = "https://api-lux.upskiller.xyz/v2/encode"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "model_type": "df_default",
    "parameters": {
        "height_roof_over_floor": 2.7,
        "floor_height_above_terrain": 0.5,
        "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
        "windows": {
            "main_window": {
                "x1": -0.5, "y1": 5, "z1": 0.9,
                "x2": -2, "y2": 5.2, "z2": 2.4,
                "window_frame_ratio": 0.2
            }
        }
    },
    "mesh": [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
}

response = requests.post(url, headers=headers, json=payload)
zip_buffer = BytesIO(response.content)

with zipfile.ZipFile(zip_buffer, 'r') as zip_file:
    with zip_file.open('image.npy') as npy_file:
        image_array = np.load(npy_file)
        print(f"Encoded shape: {image_array.shape}")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');

const url = "https://api-lux.upskiller.xyz/v2/encode";
const payload = {
    model_type: "df_default",
    parameters: {
        height_roof_over_floor: 2.7,
        floor_height_above_terrain: 0.5,
        room_polygon: [[0, 0], [0, 5], [-4, 5], [-4, 0]],
        windows: {
            main_window: {
                x1: -0.5, y1: 5, z1: 0.9,
                x2: -2, y2: 5.2, z2: 2.4,
                window_frame_ratio: 0.2
            }
        }
    },
    mesh: [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
};

fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
.then(res => res.buffer())
.then(buffer => {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();
    console.log(`ZIP contains: ${zipEntries.map(e => e.entryName)}`);
});
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.IO.Compression;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    model_type = "df_default",
    parameters = new {
        height_roof_over_floor = 2.7,
        floor_height_above_terrain = 0.5,
        room_polygon = new[] {
            new[] { 0, 0 }, new[] { 0, 5 },
            new[] { -4, 5 }, new[] { -4, 0 }
        },
        windows = new {
            main_window = new {
                x1 = -0.5, y1 = 5, z1 = 0.9,
                x2 = -2, y2 = 5.2, z2 = 2.4,
                window_frame_ratio = 0.2
            }
        }
    },
    mesh = new[] { new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 } }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/encode", content);
var zipBytes = await response.Content.ReadAsByteArrayAsync();

using var zipStream = new MemoryStream(zipBytes);
using var archive = new ZipArchive(zipStream, ZipArchiveMode.Read);
Console.WriteLine($"ZIP contains {archive.Entries.Count} files");
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/encode \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model_type": "df_default",
    "parameters": {
      "height_roof_over_floor": 2.7,
      "floor_height_above_terrain": 0.5,
      "room_polygon": [[0, 0], [0, 5], [-4, 5], [-4, 0]],
      "windows": {
        "main_window": {
          "x1": -0.5, "y1": 5, "z1": 0.9,
          "x2": -2, "y2": 5.2, "z2": 2.4,
          "window_frame_ratio": 0.2
        }
      }
    },
    "mesh": [[10, 0, 0], [10, 0, 8], [10, 20, 8]]
  }' \
  --output encoded.zip
```

</TabItem>
</Tabs>

---

## POST /encode_raw

Encodes room parameters using pre-calculated obstruction angles.

**Request Body**

Same as `/encode`, but window objects must include:

```json
{
  "direction_angle": 90.0,
  "horizon": [/* 64 angles */],
  "zenith": [/* 64 angles */]
}
```

Response format identical to `/encode`.

---

## POST /stats

Calculates statistical metrics for daylight simulation results.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| df_matrix | array | 2D array of daylight factor values |
| room_mask | array | 2D boolean array marking room area |

**Response**

```json
{
  "status": "success",
  "mean": 2.5,
  "median": 2.3,
  "min": 0.1,
  "max": 5.8,
  "std": 1.2
}
```

[Sample response JSON](https://github.com/upskiller-xyz/server_stats/blob/master/assets/sample_result.json)

**Example**

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/stats"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "df_matrix": [[1.2, 1.5, 1.8], [2.0, 2.3, 2.5]],
    "room_mask": [[True, True, True], [True, True, True]]
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Mean DF: {result['mean']}%")
print(f"Median DF: {result['median']}%")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch("https://api-lux.upskiller.xyz/v2/stats", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        df_matrix: [[1.2, 1.5, 1.8], [2.0, 2.3, 2.5]],
        room_mask: [[true, true, true], [true, true, true]]
    })
})
.then(res => res.json())
.then(data => console.log(`Mean DF: ${data.mean}%`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    df_matrix = new[] {
        new[] { 1.2, 1.5, 1.8 },
        new[] { 2.0, 2.3, 2.5 }
    },
    room_mask = new[] {
        new[] { true, true, true },
        new[] { true, true, true }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/stats", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/stats \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "df_matrix": [[1.2, 1.5, 1.8], [2.0, 2.3, 2.5]],
    "room_mask": [[true, true, true], [true, true, true]]
  }'
```

</TabItem>
</Tabs>

---

## POST /merge

Merges multiple window simulation results into a single combined image.

**Request Body**

| Property | Type | Description |
|----------|------|-------------|
| window_results | object | Window results keyed by window ID |

Each window result contains `df_matrix` and `room_mask` arrays.

**Response**

```json
{
  "status": "success",
  "merged_result": {
    "df_matrix": [/* merged 2D array */],
    "room_mask": [/* merged 2D array */]
  }
}
```

**Example**

<Tabs>
<TabItem value="python" label="Python" default>

```python
import requests

url = "https://api-lux.upskiller.xyz/v2/merge"
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
payload = {
    "window_results": {
        "window_1": {
            "df_matrix": [[1.2, 1.5], [2.0, 2.3]],
            "room_mask": [[True, True], [True, True]]
        },
        "window_2": {
            "df_matrix": [[0.8, 1.0], [1.5, 1.8]],
            "room_mask": [[True, True], [True, True]]
        }
    }
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
print(f"Merged matrix shape: {len(result['merged_result']['df_matrix'])}")
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

fetch("https://api-lux.upskiller.xyz/v2/merge", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        window_results: {
            window_1: {
                df_matrix: [[1.2, 1.5], [2.0, 2.3]],
                room_mask: [[true, true], [true, true]]
            },
            window_2: {
                df_matrix: [[0.8, 1.0], [1.5, 1.8]],
                room_mask: [[true, true], [true, true]]
            }
        }
    })
})
.then(res => res.json())
.then(data => console.log('Merged successfully'));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_API_TOKEN");

var payload = new {
    window_results = new {
        window_1 = new {
            df_matrix = new[] { new[] { 1.2, 1.5 }, new[] { 2.0, 2.3 } },
            room_mask = new[] { new[] { true, true }, new[] { true, true } }
        },
        window_2 = new {
            df_matrix = new[] { new[] { 0.8, 1.0 }, new[] { 1.5, 1.8 } },
            room_mask = new[] { new[] { true, true }, new[] { true, true } }
        }
    }
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");
var response = await client.PostAsync("https://api-lux.upskiller.xyz/v2/merge", content);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);
```

</TabItem>
<TabItem value="curl" label="curl">

```bash
curl -X POST https://api-lux.upskiller.xyz/v2/merge \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "window_results": {
      "window_1": {
        "df_matrix": [[1.2, 1.5], [2.0, 2.3]],
        "room_mask": [[true, true], [true, true]]
      },
      "window_2": {
        "df_matrix": [[0.8, 1.0], [1.5, 1.8]],
        "room_mask": [[true, true], [true, true]]
      }
    }
  }'
```

</TabItem>
</Tabs>

---

## Error Responses

All endpoints return errors in JSON format:

```json
{
  "status": "error",
  "error": "Description of what went wrong",
  "error_type": "validation_error"
}
```

**HTTP Status Codes**

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Invalid or missing API token |
| 403 | Forbidden |
| 500 | Internal server error |
| 503 | Service unavailable |
| 504 | Request timeout |

**Common Errors**

Missing required field:
```json
{
  "error": "Missing required parameters: window_frame_ratio"
}
```

Out of range value:
```json
{
  "error": "Parameter 'height_roof_over_floor' value 35.0 outside valid range [0, 30]"
}
```

Invalid mesh:
```json
{
  "error": "Mesh must contain at least 3 points"
}
```

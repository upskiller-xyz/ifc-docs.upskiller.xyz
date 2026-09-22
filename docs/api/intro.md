---
sidebar_position: 2
---

# Quick Start

Send a POST request to `/run` with room parameters to receive encoded images for daylight analysis.

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
<TabItem value="nodejs" label="Node.js">

```javascript
const fetch = require('node-fetch');

const url = 'https://api-lux.upskiller.xyz/v2/run';
const payload = {
  model_type: 'df_default',
  parameters: {
    height_roof_over_floor: 2.7,
    floor_height_above_terrain: 3.0,
    room_polygon: [
      [0, 0],
      [5, 0],
      [5, 4],
      [0, 4],
    ],
    windows: {
      main_window: {
        x1: -0.6,
        y1: 0.0,
        z1: 0.9,
        x2: 0.6,
        y2: 0.0,
        z2: 2.4,
        window_frame_ratio: 0.15,
      },
    },
  },
  mesh: [
    [10, 0, 0],
    [10, 0, 8],
    [10, 20, 8],
    [10, 20, 8],
    [10, 20, 0],
    [10, 0, 0],
  ],
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_API_TOKEN',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .then((data) => console.log(`Status: ${data.status}`));
```

</TabItem>
<TabItem value="csharp" label="C#">

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

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
        new[] { 10, 0, 0 }, new[] { 10, 0, 8 }, new[] { 10, 20, 8 },
        new[] { 10, 20, 8 }, new[] { 10, 20, 0 }, new[] { 10, 0, 0 }
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

## Next Steps

[API Reference](./api-reference) - Complete endpoint documentation

[Overview](./overview) - Pricing, authentication, and use cases

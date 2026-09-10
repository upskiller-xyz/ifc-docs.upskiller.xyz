---
sidebar_position: 10
---

# Microservices Architecture

Server LUX orchestrates requests across five specialized microservices. Each service operates independently and communicates via HTTP.

## Service Overview

| Service | Port | Purpose |
|---------|------|---------|
| Main Gateway | 8080 | Request orchestration and API endpoints |
| Obstruction | 8081 | Horizon and zenith angle calculation from 3D mesh |
| Encoder | 8082 | Room geometry encoding to model input format |
| Model | 8083 | Daylight factor simulation |
| Merger | 8084 | Multi-window result combination |
| Stats | 8085 | Statistical metrics calculation |

## Obstruction Service

Port: `8081`

Calculates horizon and zenith obstruction angles from 3D mesh data.

### `/obstruction_all`

Calculate both horizon and zenith angles for all 64 directions.

**Input:**
```json
{
  "x": 0.0,
  "y": 3.0,
  "z": 1.5,
  "mesh": [[x, y, z], ...]
}
```

**Output:**
```json
{
  "status": "success",
  "horizon": [/* 64 values */],
  "zenith": [/* 64 values */]
}
```

### `/horizon`

Calculate single horizon angle for specific direction.

**Input:**
```json
{
  "x": 0.0,
  "y": 3.0,
  "z": 1.5,
  "direction_angle": 90.0,
  "mesh": [[x, y, z], ...]
}
```

**Output:**
```json
{
  "status": "success",
  "horizon": 15.5
}
```

### `/zenith`

Calculate single zenith angle for specific direction. Input and output format identical to `/horizon`.

## Encoder Service

Port: `8082`

Encodes room parameters and obstruction data into model input format.

### `/encode`

Encode room geometry with obstruction angles.

**Input:**
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
        "window_frame_ratio": 0.2,
        "horizon": [/* 64 angles */],
        "zenith": [/* 64 angles */]
      }
    }
  }
}
```

**Output:** Binary ZIP file containing encoded NPY arrays.

## Model Service

Port: `8083`

Runs daylight simulation model on encoded room data.

### `/simulate`

Perform daylight factor simulation.

**Input:** NPZ file (multipart/form-data)

**Output:**
```json
{
  "status": "success",
  "df_matrix": [[/* 128x128 values */]],
  "room_mask": [[/* 128x128 booleans */]]
}
```

## Merger Service

Port: `8084`

Merges simulation results from multiple windows.

### `/merge`

Combine multiple window results.

**Input:**
```json
{
  "window_results": {
    "window_1": {
      "df_matrix": [[/* values */]],
      "room_mask": [[/* booleans */]]
    },
    "window_2": {
      "df_matrix": [[/* values */]],
      "room_mask": [[/* booleans */]]
    }
  }
}
```

**Output:**
```json
{
  "status": "success",
  "merged_result": {
    "df_matrix": [[/* merged values */]],
    "room_mask": [[/* merged booleans */]]
  }
}
```

## Stats Service

Port: `8085`

Calculates statistical metrics for daylight simulation results.

### `/calculate`

Calculate statistics for daylight factor data.

**Input:**
```json
{
  "result": [[1.2, 1.5], [2.0, 2.3]],
  "mask": [[true, true], [true, true]]
}
```

**Output:**
```json
{
  "status": "success",
  "metrics": {
    "max": 2.3,
    "mean": 1.75,
    "median": 1.85,
    "min": 1.2,
    "valid_area": 100.0
  }
}
```

## Service Workflow

The `/v2/run` endpoint orchestrates these services in sequence:

**Per window:**
1. Obstruction Service → Calculate angles from mesh
2. Encoder Service → Encode parameters + angles to NPZ
3. Model Service → Simulate daylight factor from NPZ

**After all windows:**
4. Merger Service → Combine all window results

**Optional:**
5. Stats Service → Calculate metrics from merged result

## Data Flow

```
Client Request (model_type, parameters, mesh)
  │
  └─> For each window:
      │
      ├─> [Obstruction] mesh + position → horizon[64] + zenith[64]
      │
      ├─> [Encoder] parameters + angles → NPZ file
      │
      └─> [Model] NPZ → df_matrix + room_mask
  │
  └─> [Merger] all window results → merged df_matrix + room_mask
  │
  └─> [Stats] merged result → metrics (optional)
```

## Error Handling

All services return errors in this format:

```json
{
  "status": "error",
  "error": "Error description"
}
```

Main Gateway behavior:
- Stops processing if any service fails
- Returns error details in response
- Does not retry failed requests

## Deployment

Configure service endpoints via environment variable:

- **`DEPLOYMENT_MODE=local`** - Uses `http://localhost:PORT`
- **`DEPLOYMENT_MODE=production`** - Uses configured production endpoints

Service URLs for local deployment:
- `OBSTRUCTION_SERVICE_URL=http://obstruction-service:8081`
- `ENCODER_SERVICE_URL=http://encoder-service:8082`
- `MODEL_SERVICE_URL=http://model-service:8083`
- `MERGER_SERVICE_URL=http://merger-service:8084`
- `STATS_SERVICE_URL=http://stats-service:8085`

## Notes

Services operate independently. No inter-service communication occurs. Main server handles all orchestration.

Timeout is 60 seconds per service call.

---
sidebar_position: 5
pagination_prev: contributing/parameters-reference
pagination_next: contributing/templates
---

# Coordinate System

LUX uses the XYZ coordinate system:

```
Z ↑ (Up - Vertical)
|
|
+---→ X (East - Horizontal)
 \
  \
   → Y (North - Horizontal)
```

**X-axis** - Horizontal, points East

**Y-axis** - Horizontal, points North

**Z-axis** - Vertical, points Up

_Note: North and East are mostly used for indicating that axes lie in the horizontal plane._

## Single-Angle Direction System

### Overview

The obstruction calculation API uses a simplified single horizontal rotation angle system. The view direction stays in the horizontal plane.

### Rotation Convention

- **Z-axis**: Points upward (vertical) ⬆️
- **X-Y plane**: Horizontal plane
- **Rotation**: Counter-clockwise when viewed from above (looking down the Z-axis)

### Direction Angle

**Parameter**: `direction_angle` (float, radians)

**Range**: 0 to 2π (0 to 360°)

**Direction Mapping**:

| Angle (rad) | Angle (°) | Direction | Compass |
| ----------- | --------- | --------- | ------- |
| 0           | 0         | +X        | East    |
| π/2         | 90        | +Y        | North   |
| π           | 180       | -X        | West    |
| 3π/2        | 270       | -Y        | South   |

### Python Example

```python
import numpy as np

# Facing east (+X direction)
request = {
    "x": 0.0,
    "y": 0.0,
    "z": 3.0,
    "direction_angle": 0.0,
    "mesh": [...]
}

# Facing north (+Y direction)
request["direction_angle"] = np.pi / 2

# Facing west (-X direction)
request["direction_angle"] = np.pi

# Facing south (-Y direction)
request["direction_angle"] = 3 * np.pi / 2
```

---
sidebar_position: 3
---

# Encoding System

The encoding system converts room geometry and parameters into 128×128 pixel images. Each pixel's RGBA channels encode specific geometric, radiometric, or contextual information. Neural networks process these images to predict daylight distribution.

## How the image is built

**Resolution** - 128×128 pixels at base scale. Each pixel represents 0.1 m (10 cm). Total area: 12.8 m × 12.8 m.

**Reference Point** - Window center, aligned with outer plane of facade wall. Positioned 12 pixels from right edge, vertically centered.

**Coordinate System** - Window normal vector points toward right image edge. X-axis (along facade) maps to vertical in image. Y-axis (into room) maps to horizontal in image, reversed (deeper = leftward). Z-axis (height) encoded in channel values.

## Image Regions

![Encoding Areas](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/encoding_areas.svg)

Regions drawn in order (later regions overwrite earlier):

1. **Background** - Fills entire image. Encodes floor height, facade reflectance, terrain reflectance, window orientation (DA modes).

2. **Room Polygon** - Interior space mask. Encodes ceiling height, floor/wall/ceiling reflectances. Clipped to prevent overlap with boundaries.

3. **Window** - Vertical bar at fixed position (12 pixels from right edge). Encodes sill height, frame ratio, window height, frame reflectance.

4. **Obstruction Bar** - 4×64 pixel bar at right edge. Each row represents a horizontal azimuth angle (±72.5° from facade normal). Encodes obstruction angles (horizon and zenith), context reflectance, balcony reflectance.

## Boundary Rules

**C-Frame Border** - Outermost 2 pixel rows/columns must remain background. Ensures background parameters always visible. Critical for model training (avoids edge artifacts).

**Room Clipping** - Room polygon clipped at x=121 (at 128×128 scale). Creates 2-pixel gap before obstruction bar (starts at x=124). Uses Shapely geometric operations for precision.

### Large and L-Shaped Rooms

Rooms exceeding 10 m width/length or L-shaped rooms with windows on internal corners require clipping. Room area clipped 2 pixels from image border at [standard scale](#scaling-behavior) (128×128, scaling is linear). For L-shaped rooms, clipping occurs 2 pixels from obstruction bar area.

<div style={{display: 'flex', gap: '16px', justifyContent: 'center', margin: '20px 0'}}>
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/wide_room_area.svg" alt="Wide room clipping" style={{width: '30%'}} />
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/long_room_area.svg" alt="Long room clipping" style={{width: '30%'}} />
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/l_shaped_area.svg" alt="L-shaped room clipping" style={{width: '30%'}} />
</div>

Clipped areas receive negligible daylight and do not significantly affect predictions.

## Channel Encoding

Each region's pixels encode parameters via RGBA channels. Encoding varies by model type.

<details>
<summary>Encoded Parameters by Region</summary>

### Background Region

| Parameter                  | Channel | Range  | Used In      |
| -------------------------- | ------- | ------ | ------------ |
| Terrain reflectance        | Red     | 0-1    | Custom modes |
| Floor height above terrain | Green   | 0-10 m | All models   |
| Facade reflectance         | Blue    | 0-1    | Custom modes |
| Window orientation         | Alpha   | 0-360° | DA modes     |

### Room Region

| Parameter                      | Channel | Range  | Used In      |
| ------------------------------ | ------- | ------ | ------------ |
| Vertical reflectance (walls)   | Red     | 0-1    | Custom modes |
| Horizontal reflectance (floor) | Green   | 0-1    | Custom modes |
| Height roof over floor         | Blue    | 0-30 m | All models   |
| Ceiling reflectance            | Alpha   | 0.5-1  | Custom modes |

### Window Region

| Parameter         | Channel | Range              | Used In      |
| ----------------- | ------- | ------------------ | ------------ |
| Sill height       | Red     | 0-5 m              | All models   |
| Frame ratio       | Green   | 0-1 (reversed)     | All models   |
| Window height     | Blue    | 0.2-5 m (reversed) | All models   |
| Frame reflectance | Alpha   | 0-1                | Custom modes |

### Obstruction Bar Region

| Parameter                 | Channel | Range   | Used In      |
| ------------------------- | ------- | ------- | ------------ |
| Obstruction angle zenith  | Red     | 0-70°   | All models   |
| Context reflectance       | Green   | 0.1-0.6 | Custom modes |
| Obstruction angle horizon | Blue    | 0-90°   | All models   |
| Balcony reflectance       | Alpha   | 0-1     | Custom modes |

</details>

**Normalization** - Input values scaled from parameter range to [0, 1], then multiplied by 255 to match pixel intensity range.

**Reversed Parameters** - Frame ratio and window height use inverted encoding: `normalized = 1.0 - ((input - min) / (max - min))`.

## Multi-Window Support

Rooms with windows on different facades get one encoded image per window. Room polygon and window coordinates rotated so each window faces right (toward image edge).

**Rotation angles**

- South facade (0°): No rotation
- West facade (90°): Rotate -270°
- North facade (180°): Rotate -180°
- East facade (270°): Rotate -90°

Daylight distributions from each window summed during post-processing to obtain total DF/DA for full room.

## Scaling Behavior

All dimensions scale proportionally with image size:

```python
scale = image_size / 128.0
resolution = 0.1 / scale  # meters per pixel
```

**Examples**

- 128×128: 1 pixel = 0.10 m
- 256×256: 1 pixel = 0.05 m
- 512×512: 1 pixel = 0.025 m
- 1024×1024: 1 pixel = 0.0125 m

Pixel dimensions (window offset, wall thickness, obstruction bar width, border width) scale by multiplying base dimensions by scale factor.

## Integration with LUX

The public LUX API exposes the encoder at `/encode` endpoint. Users send room parameters via JSON. Encoder returns PNG images. These images feed into daylight prediction models (DF/DA) to generate daylight distributions.

Complete encoding logic: [encoding_logic](https://github.com/upskiller-xyz/server_encoder/blob/main/docs/encoding_logic)

API specification: [Code Section](../api/intro)

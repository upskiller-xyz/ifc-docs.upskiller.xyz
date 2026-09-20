---
unlisted: true
sidebar_position: 2
---

# Encoding Reference

Each encoded room image is 128 × 128 pixels. Each pixel represents 10 cm in real space (12.8 m × 12.8 m total area).

![Encoding Areas](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/encoding_areas.png)

## Coordinate System

The room's reference point is the window center, aligned with the outer plane of the façade wall. This point is positioned 12 pixels (1.2 m) from the right image edge, centered vertically.

The window normal vector points toward the right edge of the image.

## Image Regions

**Background** - Fills entire image. Encodes floor height, facade reflectance, terrain reflectance, window orientation (DA modes).

**Room Polygon** - Interior space mask. Encodes ceiling height, floor/wall/ceiling reflectances.

**Window** - Vertical bar at fixed position. Encodes sill height, frame ratio, window height, frame reflectance.

**Obstruction Bar** - 4×64 pixel bar at right edge. Each of 64 rows represents a horizontal azimuth angle (±72.5° from facade normal). Encodes obstruction angles (horizon and zenith), context reflectance, balcony reflectance.

## Boundaries

The outermost 2 pixel rows/columns form a C-frame border (background only). Rooms clipped to stay within boundaries.

Rooms exceeding frame size are cropped. Lateral walls beyond 6 m from window center and back walls beyond 11 m receive negligible daylight.

Multi-window rooms are encoded as separate (room + window) pairs. Daylight distributions from each window summed during post-processing.

## Small Details

### Large and L-Shaped Rooms

Rooms exceeding 10 m width/length or L-shaped rooms with windows on internal corners require clipping. Room area clipped 2 pixels from image border at standard scale (128×128, 10 cm per pixel). For L-shaped rooms, clipping occurs 2 pixels from obstruction bar area.

<div style={{display: 'flex', gap: '16px', justifyContent: 'center', margin: '20px 0'}}>
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/wide_room_area.svg" alt="Wide room clipping" style={{width: '30%'}} />
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/long_room_area.svg" alt="Long room clipping" style={{width: '30%'}} />
  <img src="https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/l_shaped_area.svg" alt="L-shaped room clipping" style={{width: '30%'}} />
</div>

Clipped areas receive negligible daylight and do not significantly affect predictions.

## Channel Encoding

Each pixel's RGB and alpha channels encode geometric, radiometric, or contextual parameters. Encoding varies by model type: DF (Daylight Factor) with default materials, DA (Daylight Autonomy) with default materials, DF with customizable materials, DA with customizable materials.

<details>
<summary>Encoded Parameters</summary>

| Feature                                           | Image Element   | Channel | Value Range               | Used in Models |
| ------------------------------------------------- | --------------- | ------- | ------------------------- | -------------- |
| Window orientation                                | Background      | Alpha   | 0° (South) – 360°         | DA, DA Custom  |
| Balcony underside reflectance                     | Obstruction bar | Alpha   | 0–1                       | DF/DA Custom   |
| Ceiling reflectance                               | Room            | Alpha   | 0.5–1                     | DF/DA Custom   |
| Window frame reflectance                          | Window          | Alpha   | 0–1                       | DF/DA Custom   |
| Terrain reflectance                               | Background      | Red     | 0–1                       | DF/DA Custom   |
| Obstruction elevation angle (from zenith)         | Obstruction bar | Red     | 0°–70°                    | All models     |
| Wall / window niche reflectance                   | Room            | Red     | 0–1                       | DF/DA Custom   |
| Window height                                     | Window          | Red     | 0.2–5 m                   | All models     |
| Floor height above terrain                        | Background      | Green   | 0.1–10 m                  | All models     |
| Façade reflectance (context buildings)            | Obstruction bar | Green   | 0–0.6 (1 if unobstructed) | DF/DA Custom   |
| Floor / window sill reflectance                   | Room            | Green   | 0–1                       | DF/DA Custom   |
| Window frame ratio (glazing area ratio)           | Window          | Green   | 0–1                       | All models     |
| Façade reflectance (own building)                 | Background      | Blue    | 0–1                       | DF/DA Custom   |
| Obstruction angle (horizontal from façade normal) | Obstruction bar | Blue    | 0°–90°                    | All models     |
| Height roof over floor                            | Room            | Blue    | 0–30 m                    | All models     |
| Window sill height over floor                     | Window          | Blue    | 0–5 m                     | All models     |

Each channel is normalized to [0, 255] to match pixel intensity range.

For custom material models, reflectance and geometry parameters are encoded in alpha channels. Default-material models use fixed per-surface reflectances.

</details>

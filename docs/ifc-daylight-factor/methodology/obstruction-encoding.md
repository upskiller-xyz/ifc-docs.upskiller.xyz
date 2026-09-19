---
sidebar_position: 4
---

# Obstruction encoding

External obstructions — neighbouring buildings and the room's own balconies — block part
of the sky seen from a window and are one of the strongest drivers of the daylight factor.
LUX encodes them as two angle profiles sampled around the window, which the model reads
alongside the room geometry.

## Horizon and zenith angles

LUX uses two angle types, each sampled in **64 azimuth directions** across a **145°
field of view** (±72.5° from the window normal):

- **Horizon angle** — measured upward from the horizontal through the window reference
  point to the top of a *building* obstruction in that direction. Range 0–90°. `0°` = clear
  sky down to the horizon; larger values = a closer or taller building.
- **Zenith angle** — measured downward from the zenith to the underside of an overhead
  obstruction, primarily the room's own *balcony* or a deep reveal. Range 0–70°.

A sector that is fully blocked is encoded with a **45° sentinel** value so the model can
distinguish "completely obstructed" from a merely large angle.

## Direction sampling

Each of the 64 directions represents one slice of the viewing hemisphere; together they
describe the obstruction profile across the whole field of view.

For simple contexts, provide a single value applied to all 64 directions. For complex
urban contexts, provide an array of 64 values (one per direction).

```json
// Single value for uniform context
"horizon": 15

// Array for directional context
"horizon": [10, 12, 15, 18, ...]
```

## Calculation Method

Obstruction angles are computed using orthographic projection onto a vertical plane through the window.

The vertical plane contains the window's viewing direction and the world up vector (Y-axis). All obstruction geometry projects onto this plane. The highest projected point determines the obstruction angle.

For a given direction, the angle equals `arctan(vertical_distance / horizontal_distance)` where vertical distance measures height difference from window to obstruction top, and horizontal distance measures ground-level distance along the viewing direction.

## Common Values

Typical obstruction angles for reference:

<details>
<summary>Urban context examples</summary>

| Context | Horizontal Angle | Zenith Angle | Description |
|---------|------------------|--------------|-------------|
| Open field | 0° | 70° | No obstructions |
| Low suburban | 5-10° | 60-70° | Single-story neighbors |
| Dense suburban | 15-25° | 50-60° | Two-story buildings |
| Urban | 30-45° | 40-50° | 4-6 story buildings |
| Dense urban | 50-70° | 20-40° | 8-12 story buildings |
| High-rise canyon | 80-90° | 5-20° | Tall buildings close to facade |

</details>

## Edge Cases

When the window views straight up or down (`rad_x = ±π/2`), the horizontal direction defaults to forward (`[1, 0, 0]`). This ensures consistent angle calculation even for unusual viewing directions.

Points behind the window (negative distance along viewing direction) are excluded from angle calculation. If no valid points exist in front of the window, the angle returns 0°.

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> [Technical details](https://dfifc.upskiller.xyz/docs/contributing/coordinate-system)

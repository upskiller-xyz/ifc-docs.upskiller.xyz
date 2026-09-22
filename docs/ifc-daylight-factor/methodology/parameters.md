---
sidebar_position: 3
---

# Parameters

Daylight simulation depends on a number of parameters, mostly describing the geometry of the simulated room. Some parameters can take default values in the early stages of an architectural project, while others, like apartment footprint and window position, are needed at any simulation stage.

## Always needed

### Room Geometry

![Parameter overview](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/parameter_explanation.png)

**`room_polygon`**: Room boundary in plan view. Array of `[x, y]` coordinate pairs in meters. Minimum 3 vertices.

```json
"room_polygon": [[0, 0], [5, 0], [5, 4], [0, 4]]
```

**`height_roof_over_floor`**: Distance from floor to ceiling in meters. Range: 0-30 m.

**`floor_height_above_terrain`**: Floor elevation above ground level in meters. Range: 0-10 m.

![Terrain reflectance explanation](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/parameter_terrain_explanation.png)

### Window Geometry

An apartment can have one or several windows as daylight entry points. Each window can be described by its coordinates in 3D space, materials and frame ratio.

`Window position` is a window opening's bounding box `x1, y1, z1, x2, y2, z2`

**`x1`, `x2`**: Window opening's extent along facade (meters)\
**`y1`, `y2`**: Window opening's extent perpendicular to facade (meters)\
**`z1`, `z2`**: Window opening's bottom (sill) and top heights _above the apartment's floor_ (meters)

![Frame ratio explanation](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/frame_ratio_explanation.png)

`window_frame_ratio`: Ratio of opaque area to total window opening area. Range: 0-1 (1 = all frame, 0 = no frame).

### Context Obstruction

**`horizon`** and **`zenith`**: two angle profiles describing how neighbouring buildings
and the room's own balconies block the sky, each sampled in 64 azimuth directions around
the window. A single value applies to all 64 directions; an array of 64 values describes
a directional context.

```json
"horizon": 25,
"zenith": 45
```

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> See [Obstruction encoding](/ifc-daylight-factor/methodology/obstruction-encoding) for the
angle definitions, direction sampling and calculation method.

## Reflectance

Reflectance parameters can be inserted at later stages of the architectural process, when you think about the choice of finishing materials both inside and outside of the apartment.

**`ceiling_reflectance`**: Ceiling light reflectance. Range: 0.50-0.90. Default: 0.80.

**`horizontal_reflectance`**: Floor light reflectance. Range: 0.05-0.60. Default: 0.30.

![Horizontal reflectance explanation](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/horizontal_reflectance_explanation.png)

**`vertical_reflectance`**: Internal wall reflectance. Range: 0.30-0.90. Default: 0.70.

![Vertical reflectance explanation](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/vertical_reflectance_explanation.png)

**`window_frame_reflectance`**: Window frame light reflectance. Range: 0.10-0.80. Default: 0.50.

**`facade_reflectance`**: Own building facade light reflectance. Range: 0.10-0.60. Default: 0.30.

![Facade reflectance explanation](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/out_reflectance_explanation.png)

**`context_reflectance`**: Surrounding building facade reflectance. Range: 0.10-0.60. Single value or array of 64 values. Default: 0.30.

**`terrain_reflectance`**: Ground surface light reflectance. Range: 0.05-0.40. Default: 0.20.

**`balcony_reflectance`**: Balcony underside light reflectance. Range: 0.30-0.90. Default: 0.70.

## Daylight Autonomy

Daylight Autonomy requires one additional parameter due to the higher complexity of this metric.

`window_orientation`: Cardinal direction window faces in degrees. Range: 0-360° (0 = South, 90 = West, 180 = North, 270 = East). Default value: 288°.

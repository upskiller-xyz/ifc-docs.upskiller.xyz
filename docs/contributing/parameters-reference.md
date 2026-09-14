---
sidebar_position: 4
pagination_next: contributing/coordinate-system
---

# Parameter Reference

Parameters used in LUX daylight analysis. Automatically extracted from Revit models or provided via API.

Coordinate values use the XYZ coordinate system with Z pointing up. See [Coordinate System](/docs/contributing/coordinate-system) for details.

## Room Geometry

| Parameter | Description | Format | Default Value |
|-----------|-------------|--------|---------------|
| Room boundary | 2D outline of the room at floor level | Array of coordinate pairs `[[x1,y1], [x2,y2], ...]` | Required |
| Floor height above terrain | Vertical position of the floor level | Float (meters) | Required |
| Roof height above terrain | Vertical position of the roof level | Float (meters) | Required |

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> [How to measure](/docs/ifc-daylight-factor/methodology/parameters#room-geometry)

## Window Properties

| Parameter | Description | Format | Default Value |
|-----------|-------------|--------|---------------|
| Window position | Center point of the window on the facade in XYZ coordinates (Z-up) | Coordinate pair `[x1, y1, z1, x2, y2, z2]` | Required, measured by the app |
| Window sill height | Distance from floor to bottom of window | Float (meters) | Required, measured by the app |
| Window frame ratio | Ratio of opaque area to total window area | Float (0-1) | Required |
| Window orientation | Cardinal direction the window faces | Float (degrees, 0-360°) | 288° |

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> [How to measure](/docs/ifc-daylight-factor/methodology/parameters#window-geometry) | [Coordinate System](/docs/contributing/coordinate-system)

## Context & Obstructions

Obstruction mesh vertices use XYZ coordinates (Z-up). Direction angles define horizontal rotation in the XY plane.

| Parameter | Description | Format | Default Value |
|-----------|-------------|--------|---------------|
| Horizon angle | Angular distance from horizontal line at the window reference point to surrounding obstructions | Array of angles `[a1, a2, ...]` or single float (degrees, 0-90°) | Required |
| Zenith angle | Angular distance from vertical line at the window reference point to overhead obstructions | Array of angles `[a1, a2, ...]` or single float (degrees, 0-90°) | Required |

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> [How to measure](/docs/ifc-daylight-factor/methodology/parameters#context-obstruction) | [Coordinate System](/docs/contributing/coordinate-system) | [Direction Angles](/docs/contributing/coordinate-system#single-angle-direction-system)

## Material Properties

| Parameter | Description | Format | Default Value |
|-----------|-------------|--------|---------------|
| Wall reflectance | Light reflectance of interior walls | Float (0.30-0.90) | 0.70 |
| Floor reflectance | Light reflectance of floor surface | Float (0.05-0.60) | 0.30 |
| Ceiling reflectance | Light reflectance of ceiling surface | Float (0.50-0.90) | 0.80 |
| Facade reflectance | Light reflectance of exterior facade | Float (0.10-0.60) | 0.30 |
| Terrain reflectance | Light reflectance of ground surface | Float (0.05-0.40) | 0.20 |
| Window frame reflectance | Light reflectance of window frames | Float (0.10-0.80) | 0.50 |
| Context reflectance | Light reflectance of surrounding buildings | Float (0.10-0.60) | 0.30 |
| Balcony reflectance | Light reflectance of balcony underside | Float (0.30-0.90) | 0.70 |

<svg viewBox="0 0 24 24" style={{height: '1em', width: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', verticalAlign: '-0.125em', marginRight: '0.4em'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> [How to measure](/docs/ifc-daylight-factor/methodology/parameters#reflectance)
____


## Still unclear?

Check [parameter explanation](/docs/ifc-daylight-factor/methodology/parameters) for more details about each parameter.

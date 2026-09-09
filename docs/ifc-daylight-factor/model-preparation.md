---
sidebar_position: 2
pagination_prev: ifc-daylight-factor/intro
pagination_next: ifc-daylight-factor/getting-started
---

# Preparing Your IFC File

## Main Building Model

Include only elements that define the building envelope and room geometry. Exclude everything else to keep the file lightweight.

**Include:**

| IFC type | Description |
|---|---|
| IfcSpace | Room volumes — required for room detection |
| IfcWall / IfcWallStandardCase | Walls |
| IfcWindow | Windows |
| IfcSlab | Floor and roof slabs |
| IfcRoof | Roof elements |
| IfcPlate | Balcony slabs, overhangs, horizontal elements |

**Exclude:** furniture, MEP/HVAC, stairs, railings, annotations, and detailed interior fittings. If it does not affect room shape or how much sky a window can see, leave it out.

## Context Buildings (Optional)

Model a surrounding building only if it blocks part of the sky seen from the windows of the rooms you will analyse. A building that sits below those windows, or is far enough away to fall under the horizon seen from them, has no effect on the result and can be left out.

Model context as **masses (generic volumetry)**, not detailed BIM. Simple blocks at the right height and footprint are enough, and they keep the file small.

**Do not model vegetation.** Trees, hedges and other planting are not treated as permanent obstructions and are excluded from the calculation.

## Recommended File Sizes

| Model type | Max recommended size |
|---|---|
| Main building IFC | < 10 MB |
| Surrounding buildings IFC | < 2 MB each |

Keeping files within these limits ensures the tool runs smoothly in the browser. For larger or more complex models, contact [upskiller](https://upskiller.xyz) about the advanced [LUX Live](https://docs.upskiller.xyz/docs/lux-live/intro) Revit plugin.

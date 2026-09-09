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

Surrounding buildings should be modeled as **masses (generic volumetry)** rather than detailed BIM models. This keeps file sizes small and ensures the sky obstruction calculation stays accurate.

## Recommended File Sizes

| Model type | Max recommended size |
|---|---|
| Main building IFC | < 10 MB |
| Surrounding buildings IFC | < 2 MB each |

Keeping files within these limits ensures the tool runs smoothly in the browser. For larger or more complex models, contact [upskiller](https://upskiller.xyz) about the advanced [LUX Live](https://docs.upskiller.xyz/docs/lux-live/intro) Revit plugin.

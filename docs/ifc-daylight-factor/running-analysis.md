---
sidebar_position: 4
pagination_prev: ifc-daylight-factor/getting-started
pagination_next: ifc-daylight-factor/results
---

# Running an Analysis

1. **Hover** over a room: the room volume and floor turn green, and a tooltip shows the room name
2. **Click** the highlighted room to start the analysis
3. The results panel opens on the right side

The tool automatically extracts room geometry, windows, and floor polygon, sends the data to the backend, and displays results.

## What Gets Analyzed

IFC Daylight Factor detects the following from your IFC model:

- Room dimensions (from the IfcSpace bounding volume)
- Window positions, sizes, and glass-to-frame ratios
- Sky obstruction from surrounding geometry (balconies, overhangs, context buildings)

If a room has no IfcSpace element or no IfcWindow elements, the analysis will not run. Make sure your IFC export includes these types — see [Preparing Your IFC File](./model-preparation).

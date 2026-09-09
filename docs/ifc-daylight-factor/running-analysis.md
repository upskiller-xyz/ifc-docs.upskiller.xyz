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

## Checking the Inputs

When the analysis runs, the **Room Properties** panel shows what the tool extracted from your model. Check these values before trusting the result — if something is wrong, fix the IFC and re-run.

<img src="/img/ifc/room-properties.png" alt="Room Properties panel" width="330" />

| Field | Meaning |
|---|---|
| Name | IfcSpace name or number |
| Room Height | Floor to ceiling |
| Roof over Floor | Floor to the roof above (top-floor rooms) |
| Floor over Terrain | Height of the floor above ground |
| Floor Area | Area of the room floor polygon |
| Window-to-Floor Ratio | Total glazed area divided by floor area |

### Windows

The **Windows** section lists every window found in the room. Use the dropdown to inspect each one.

![Room Properties window panel](/img/ifc/room-properties-window.png)

| Field | Meaning |
|---|---|
| Height / Sill Height | Window height, and height of its base above the floor |
| Opening Area | Glazed area of the window |
| Frame Ratio | Share of the opening taken up by the frame |

**Show obstruction (3D)** draws what blocks the sky from that window. The **Fisheye** view is a hemispherical projection: light areas are visible sky, dark areas are obstructions (balconies, overhangs, context buildings). The **Sky obstruction** bar summarises how much sky is blocked from the horizon up to the zenith.

If a room has no IfcSpace element or no IfcWindow elements, the analysis will not run — see [Preparing Your IFC File](./model-preparation).

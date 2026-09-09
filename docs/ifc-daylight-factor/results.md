---
sidebar_position: 5
pagination_prev: ifc-daylight-factor/running-analysis
---

# Results & Settings

## Input Tab (Visual QA)

Before trusting the simulation, verify that the data extracted from your model is correct. The Input tab shows everything that was sent to the backend.

**Room Info**: check that room height and floor area match your model.

**Windows**: use the dropdown to inspect each window. For each window verify:

- Position and dimensions match the real window location
- Glass area and frame ratio look realistic
- All windows in the room are listed

**Sky Obstruction Fisheye Diagram** — when a window is selected, a hemispherical projection shows what the sky "sees" from that window. Light areas = visible sky. Dark areas = obstructions (buildings, balconies, terrain). Verify that balconies above the window and nearby buildings are captured correctly.

If anything looks wrong, the simulation result will be unreliable. Fix the IFC model and re-run.

## Output Tab

- **Heatmap**: color-coded grid on the room floor showing daylight factor values:
  - Blue = 0% DF
  - Purple/Red = 1–2% DF
  - Yellow = 5% DF
  - White = 10%+ DF
- **BFS 2024:8 Compliance**: whether the room meets the Swedish daylight regulation (DF ≥ 1% across more than 50% of the habitable-room area) — see [Daylight Metrics](https://docs.upskiller.xyz/docs/concepts/daylight-metrics) for a full explanation
- **Threshold Overlay**: toggle to highlight the compliant area in green

## Settings

Click the **gear icon** (bottom-right) to open settings:

- **Standard**: the Swedish regulation (BFS 2024:8) is active. Additional standards (Norway NS 3940, Danish BR18) are available in [LUX Live](https://docs.upskiller.xyz/docs/lux-live/intro).
- **Reflectance values**: ceiling, wall, floor, and ground. The web version uses the fixed default values. Custom per-surface reflectances are planned; today they are reachable through the [API](https://docs.upskiller.xyz/docs/api/intro) only.
- **Light Transmittance (LT)**: adjust the slider (45–89%) to change glass transmittance. The heatmap recalculates automatically.

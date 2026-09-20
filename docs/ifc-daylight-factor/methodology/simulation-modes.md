---
sidebar_position: 2
---

# Simulation modes

LUX supports four simulation modes combining two daylight metrics (Daylight Factor (DF) and Daylight Autonomy (DA)) with two material configurations (default and custom).

Only **DF Default** is validated and in production use. **DF Custom** is developed but not
yet deployed — it needs further testing before production use (1.7–2.4× higher error, and
degradation in the sub-1 % DF compliance zone). Both **DA** modes are in
experimental development and are not yet available in any LUX product.

## Daylight Factor (DF)

DF measures the ratio of interior illuminance to exterior illuminance under overcast sky conditions. Expressed as a percentage.

**DF Default**: Uses fixed per-surface material reflectances (see [Reflectances](https://docs.upskiller.xyz/docs/regulations/other/optical-properties/reflectance)). Suitable for early-stage analysis.

**DF Custom**: Accepts user-defined reflectances for walls, floors, ceilings, facades, and terrain and gives material-specific results. Developed but not yet deployed — it needs further testing before production use (1.7–2.4× higher error, and degradation in the sub-1 % DF compliance zone).

## Daylight Autonomy (DA)

DA measures the percentage of occupied hours when daylight alone provides sufficient illuminance (typically ≥300 lux). Requires window orientation.

Both DA modes are **in experimental development and not yet available in any LUX product.**

**DA Default**: Would use fixed per-surface material reflectances (see [Reflectances](https://docs.upskiller.xyz/docs/regulations/other/optical-properties/reflectance)).

**DA Custom**: Would accept user-defined reflectances and window orientation for material-specific results.

## Parameter Usage by Mode

| Parameter                                                                               | DF Default | DF Custom | DA Default | DA Custom |
| --------------------------------------------------------------------------------------- | ---------- | --------- | ---------- | --------- |
| **Room Geometry**                                                                       |
| [Room boundary](/ifc-daylight-factor/methodology/parameters#room-geometry)              | ✓          | ✓         | ✓          | ✓         |
| [Ceiling height](/ifc-daylight-factor/methodology/parameters#room-geometry)             | ✓          | ✓         | ✓          | ✓         |
| [Floor height above terrain](/ifc-daylight-factor/methodology/parameters#room-geometry) | ✓          | ✓         | ✓          | ✓         |
| **Window Properties**                                                                   |
| [Window position](/ifc-daylight-factor/methodology/parameters#window-geometry)          | ✓          | ✓         | ✓          | ✓         |
| [Window sill height](/ifc-daylight-factor/methodology/parameters#window-geometry)       | ✓          | ✓         | ✓          | ✓         |
| [Window frame ratio](/ifc-daylight-factor/methodology/parameters#window-geometry)       | ✓          | ✓         | ✓          | ✓         |
| [Window orientation](/ifc-daylight-factor/methodology/parameters#daylight-autonomy)     | ✗ (288°)   | ✗ (288°)  | ✓          | ✓         |
| **Context & Obstructions**                                                              |
| [Horizon angle](/ifc-daylight-factor/methodology/parameters#context-obstruction)        | ✓          | ✓         | ✓          | ✓         |
| [Zenith angle](/ifc-daylight-factor/methodology/parameters#context-obstruction)         | ✓          | ✓         | ✓          | ✓         |
| **Material Reflectances**                                                               |
| [Wall reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)             | ✗ (0.70)   | ✓         | ✗ (0.70)   | ✓         |
| [Floor reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)            | ✗ (0.30)   | ✓         | ✗ (0.30)   | ✓         |
| [Ceiling reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)          | ✗ (0.80)   | ✓         | ✗ (0.80)   | ✓         |
| [Facade reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)           | ✗ (0.30)   | ✓         | ✗ (0.30)   | ✓         |
| [Terrain reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)          | ✗ (0.20)   | ✓         | ✗ (0.20)   | ✓         |
| [Window frame reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)     | ✗ (0.50)   | ✓         | ✗ (0.50)   | ✓         |
| [Context reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)          | ✗ (0.30)   | ✓         | ✗ (0.30)   | ✓         |
| [Balcony reflectance](/ifc-daylight-factor/methodology/parameters#reflectance)          | ✗ (0.70)   | ✓         | ✗ (0.70)   | ✓         |

**Legend:** ✓ Required | ✗ Not used

## When to Use Each Mode

**DF Default** is the only validated model and is in production use. It is recommended as a
replacement for preliminary daylight simulations, and for final verification where project
materials are equal to or lighter than the default set. Daylight factor is also the metric
required by the building code in Sweden.

**DF Custom** is developed but not yet deployed — see the status note above.

Daylight Autonomy has more parameters than [Daylight factor](https://docs.upskiller.xyz/docs/regulations/other/metrics/daylight-factor), which increases model complexity, and a model has to be trained per location because climate conditions vary significantly from one place to another. DA is still in experimental development. Join [the waiting list](https://forms.gle/BcdDgmZHWRDKLCBW9) and check [our Substack](https://upskillerxyz.substack.com) to be among the first to know when we release new models.

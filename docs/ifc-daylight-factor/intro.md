---
sidebar_position: 1
pagination_prev: null
title: IFC Daylight Factor
---

IFC Daylight Factor is a free browser-based daylight tool for preliminary analysis. No installation. Upload an IFC file and get daylight factor results in seconds.

**Funding:** Developed with support from [Belysningsstiftelsen](https://belysningsstiftelsen.se/).

## Who Is It For

IFC Daylight Factor is designed for three use cases:

**Municipality planners (detail plan stage)**: Check the daylight potential of proposed buildings during the detail planning process, before detailed architectural design begins.

**Bygglov officers (building permit review)**: Quickly verify whether critical rooms in a submitted design meet the Swedish daylight regulation (BFS 2024:8).

**Architects**: Upload a model and check the rooms you expect to be critical. If you find rooms or apartments that do not comply, change your BIM model and load the IFC again until it does.

## What It Does

- Loads IFC models directly in the browser
- Detects rooms automatically from IfcSpace elements
- Calculates Daylight Factor (DF) with a Swedish BFS 2024:8 compliance check
- Shows a [daylight factor](https://docs.upskiller.xyz/docs/concepts/daylight-metrics) heatmap on the room floor with the compliant area highlighted
- Free to use

## Limitations

Its results are preliminary and approximate and are not meant to be used as official proof of compliance. They are produced by a machine-learning model that has been validated against Radiance.

IFC Daylight Factor uses the default material reflectances and the Swedish regulation (BFS 2024:8) only.

To keep the shared server responsive, the tool runs at most 10 room simulations per user per day.

For project-specific materials, other standards (Norway, Denmark), or official compliance simulations, use [LUX](https://docs.upskiller.xyz/docs/lux-live/intro) — contact [alejandro.pacheco@upskiller.xyz](mailto:alejandro.pacheco@upskiller.xyz) for access.

## Get Started

1. [Preparing Your IFC File](./model-preparation)
2. [Loading a Model](./getting-started)
3. [Analysis Settings](./analysis-settings)
4. [Running an Analysis](./running-analysis)
5. [Results](./results)

Or go directly to the tool: [dfifc.upskiller.xyz](https://dfifc.upskiller.xyz)

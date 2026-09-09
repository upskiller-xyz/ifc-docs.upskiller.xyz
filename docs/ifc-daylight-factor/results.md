---
sidebar_position: 5
pagination_prev: ifc-daylight-factor/running-analysis
---

# Results & Settings

## Result

Click a room to run the analysis. The **Result** panel opens on the right.

![Result panel](/img/ifc/result.png)

- **Daylight Factor (DF) heatmap** on the room floor. Blue = 0%, red at 1–2%, green/white at 5–10%+.
- **Area with DF ≥ 1%**: share of the floor that meets the threshold, shown as a percentage and in m² (e.g. 3.92 out of 9.73 m²).
- **Compliance status** against the Swedish daylight regulation (BFS 2024:8): **COMPLIES** when DF ≥ 1% over more than 50% of the room area, otherwise **DOES NOT COMPLY**. See [Daylight Metrics](https://docs.upskiller.xyz/docs/concepts/daylight-metrics) for the full definition.
- **Result history**: reopen the result for a previously analysed room.

### Per-apartment assessment (residential)

Analysis is per room. For residential buildings the regulation requires the assessment to be made per apartment: evaluate each vistelserum in the apartment and sum their compliant areas to determine whether the apartment as a whole meets the threshold.

## Analysis Settings

Open **Analysis Settings** (left side, below the toolbar) to change the assumptions used for the calculation. The heatmap recalculates when you change a value.

<img src="/img/ifc/analysis-settings.png" alt="Analysis Settings panel" width="285" />

- **Daylight Standard**: the Swedish regulation (SE >1% DF, BFS 2024:8) is the only option in the web tool. Other standards (Norway, Denmark) are available in [LUX](https://docs.upskiller.xyz/docs/lux-live/intro).
- **Reflectance Values**: fixed defaults per surface — Floor 30%, Walls 70%, Ceiling 80%, Frames 50%, Facade 30%, Balcony 70%, Context 30%, Terrain 20%. Project-specific reflectances are available in LUX.
- **Light Transmittance (Glass)**: fraction of light the glazing lets through. Default 67%. Adjust the slider to match your specified glass.

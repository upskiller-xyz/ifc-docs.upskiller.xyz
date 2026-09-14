---
sidebar_position: 3
---

# Limitations & scope

## What the model predicts

LUX Live predicts the **spatial daylight factor** (DF) on a horizontal grid at
0.8 m above the floor, on the validated **DF Default** material set. It does **not**
currently produce:

- **Daylight autonomy / climate-based metrics** — in experimental development, not
  available in any product. See [Simulation modes](/docs/ifc-daylight-factor/methodology/simulation-modes).
- **Per-surface custom materials** (**DF Custom**) — developed but not deployed.
- View out, sunlight exposure, glare, or any thermal quantity.

## Geometry not yet supported

Certain Revit elements and configurations are ignored during data collection:

- **Curtain walls** — standard Revit curtain walls are not analysed as windows
  (support planned).
- **Skylights, roof domes, roofs by face** — only vertical glazing is supported.
- **In-place families** — generic or in-place geometry without proper categorisation.

Geometric constraints for accurate results:

1. **Verticality** — only strictly vertical windows and doors are processed;
   slanted or horizontal glazing is ignored.
2. **Rectangularity** — area calculation is optimised for rectangular openings;
   circular, arched or triangular windows produce approximated areas.
3. **Partial panels** — multi-panel windows where glazing does not span the full
   opening are not currently supported.

## Accuracy envelope

The model is most reliable inside the range of its training data (single rooms,
one to a few vertical windows, low- to mid-rise urban context). Accuracy
degrades:

- in the **sub-1 % DF** range near the compliance threshold, where small absolute
  errors can flip a room's pass/fail state;
- for rooms with **heavy external obstruction**;
- for room shapes and window arrangements far from the training distribution.

See [Accuracy & validation](/docs/ifc-daylight-factor/methodology/accuracy-and-validation) for
the measured error figures.

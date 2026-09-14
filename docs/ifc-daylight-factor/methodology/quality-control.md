---
sidebar_position: 3
---

# Quality control

## Input checks

Before a prediction runs, LUX validates the geometry it extracted from the Revit
model: every room must have a closed boundary polygon, a ceiling height and at
least one supported vertical window. Parameters outside their accepted ranges
(see [Parameters](/docs/ifc-daylight-factor/methodology/parameters)) are clamped by the
backend, and unsupported elements
(see [Limitations & scope](/docs/ifc-daylight-factor/methodology/limitations-and-scope)) are
skipped and reported in the [Analysis Log](https://docs.upskiller.xyz/docs/lux-live/analysis-log).

## Bounded output

The network output passes through a sigmoid, so a prediction can never fall
outside the physically meaningful **0–9.9 % DF** range regardless of how unusual
the input is.

## Regression testing

Model changes are checked against a fixed held-out set of Radiance-simulated
rooms and against the real-building validation set before release. The tracked
metrics — MAE, δ₁/δ₂/δ₃, quantised IoU and per-standard compliance accuracy — are
reported in [Accuracy & validation](/docs/ifc-daylight-factor/methodology/accuracy-and-validation).
A release is only promoted if these do not regress.

## Known failure modes

- Rooms near a compliance threshold: a result within a few tenths of a per cent
  of the limit should be re-checked with a full simulation.
- Heavily obstructed rooms and geometries far from the training distribution.
- Five of 102 real-building rooms produced anomalous predictions and were
  excluded from the validation statistics; investigating and eliminating such
  cases is ongoing work.

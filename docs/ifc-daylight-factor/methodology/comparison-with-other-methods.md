---
sidebar_position: 2
---

# Comparison with other methods

| Method | Speed (per room) | Physical basis | Typical use |
|---|---|---|---|
| **LUX Live (ML)** | < 1 s | Learned from Radiance | Design-time pre-check |
| Radiance ray-tracing | minutes | First-principles light transport | Certified compliance |
| Radiosity / lighting tools (e.g. DIALux, Relux) | seconds–minutes | Diffuse inter-reflection | Lighting design |
| Split-flux / hand formulas (BRE, average DF) | instant | Analytic approximation | Very early sketch checks |
| Daylight rules of thumb (glazing ratio, room depth) | instant | Empirical | Feasibility |

## Against Radiance

Radiance is the reference LUX Live is trained on and validated against. Radiance
resolves the full light transport for an arbitrary scene and is what
[LUX Certify](https://docs.upskiller.xyz/docs/lux-certify/intro) runs for permit documentation. LUX Live
reproduces its DF field to a mean absolute error of ~0.1 % DF on synthetic rooms
and ~0.35 % DF on real buildings (see
[Accuracy & validation](/docs/ifc-daylight-factor/methodology/accuracy-and-validation)),
while being several orders of magnitude faster and requiring no scene setup, no
sky file and no render farm.

## Against the average-DF / split-flux formulas

The classic BRE split-flux and average-DF formulas are instant but only give a
single room-average number and handle external obstruction crudely (one
continuous obstruction angle). LUX Live returns a full spatial DF map and encodes
obstruction in 64 directions, so it captures the shape of the daylit zone and
directional shading that the formulas miss.

## Against other ML daylight tools

Most published ML daylight predictors are trained for a fixed room shape or a
single window and predict a scalar or a coarse grid. LUX Live predicts a
384 × 384 field, treats each window independently and sums them, so it
generalises to rooms with arbitrary outlines and any number of windows.

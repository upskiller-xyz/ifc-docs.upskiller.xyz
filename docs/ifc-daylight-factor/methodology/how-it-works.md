---
sidebar_position: 1
---

# How it works

LUX Live replaces a per-room Radiance daylight simulation with a single forward
pass of a neural network. The prediction takes a fraction of a second per window
and runs on an ordinary laptop.

## The model

The predictor is a **modified SegFormer** semantic-segmentation network (MiT-B4
encoder, feature dimensions 64 / 128 / 320 / 512, a lightweight all-MLP "GLP"
decoder). It outputs a **384 × 384** image whose pixel values are the daylight
factor at that point on the floor grid, passed through a sigmoid so the output is
bounded to the physically meaningful **0–9.9 % DF** range. The network is trained
with an L1 (mean-absolute-error) loss against Radiance ground truth.

## Per-window superposition

Daylight from different windows adds linearly, so LUX predicts **each window
independently** and **sums** the per-window DF fields in post-processing. This
keeps the model small and lets it handle rooms with any number of windows without
ever having seen that exact arrangement in training.

## Inputs

Each window is encoded as a stack of image channels describing:

- the **room geometry** (plan outline, ceiling height, floor height above terrain);
- the **window geometry** (position, sill and head height, frame ratio);
- the **external obstruction** — two angle profiles (horizon and zenith) sampled
  in 64 directions across a 145° field of view. See
  [Obstruction encoding](/docs/ifc-daylight-factor/methodology/obstruction-encoding).

Material reflectances are fixed to the default set in the validated model — see
[Reflectance](https://docs.upskiller.xyz/docs/regulations/other/optical-properties/reflectance) and
[Parameters](/docs/ifc-daylight-factor/methodology/parameters) for the full list.

## Training data

The model was trained on **20,687 rooms** generated parametrically in Grasshopper
and simulated with Radiance via Ladybug Tools (`ab 6`, `ad 4096`, `as 4096`), on
a 0.25 m analysis grid at 0.8 m height, under the CIE standard overcast sky. The
rooms span row houses, perimeter blocks, semi-open blocks, slab blocks and tower
blocks, with realistic urban obstruction.

## From prediction to compliance

The summed DF field is compared against the selected regulation's threshold and
evaluation rule (for example BFS 2024:8: share of habitable-room area at
DF ≥ 1.0 %), and each room or dwelling is flagged pass / fail. See
[Regulations](https://docs.upskiller.xyz/docs/regulations/intro).

---
sidebar_position: 1
---

# Accuracy & validation

LUX Live has been validated in two stages: against held-out Radiance simulations
(synthetic) and against independent Radiance ground truth for **real buildings**
from White Arkitekter and LINK Arkitektur. The figures below are for the
validated **DF Default** model.

## Synthetic validation (n = 499)

| Metric | Value |
|---|---|
| Mean absolute error | **0.11 % DF** |
| Within ±25 % (δ₁) | 83.4 % |
| Within ±50 % (δ₂) | 97.1 % |
| Within ±100 % (δ₃) | 99.3 % |
| Quantised IoU | 0.765 |
| BFS 2024:8 compliance-ratio MAE | 2.6 pp (bias −0.38 pp) |
| TEK17 mean-DF MAE | 0.086 % DF (bias −0.005 % DF) |

## Real-building validation (n = 102)

Rooms from 18 buildings across five typologies, each with a project-specific
Radiance model as ground truth (five rooms with anomalous predictions excluded).

| Metric | Value |
|---|---|
| Mean absolute error | **0.35 % DF** (median 0.29 %) |
| RMSE | 0.52 % DF (median 0.44 %) |
| Bias (predicted − ground truth) | **+0.29 pp** (slight over-prediction) |
| Within ±25 % (δ₁) | 71.5 % |
| Within ±50 % (δ₂) | 95.1 % |
| Within ±100 % (δ₃) | 98.9 % |
| Quantised IoU | 0.652 |
| Mean ground-truth DF | 1.64 % |
| Mean predicted DF | 1.93 % |

## Compliance accuracy (n = 102)

| Standard | Rule | Accuracy | False-positive rate | False-negative rate |
|---|---|---|---|---|
| BFS 2024:8 | ≥ 50 % of floor area at DF ≥ 1 % | **86.3 %** | 22.0 % | 8.2 % |
| TEK17 §13-7 | mean room DF ≥ 2 % | **86.3 %** | 18.7 % | **0.0 %** |

The misclassifications are almost all **borderline**: every BFS false positive is
within 10.7 pp of the 50 % threshold (mean ≈ 4 pp), and every TEK17 false
positive is within 0.36 pp of the 2 % threshold. Under TEK17 the model never
misses a genuinely compliant room (FNR = 0 %).

## How to read this

- The model is a **fast pre-check**, not a substitute for the certified
  simulation. Treat a result within a few tenths of a per cent of a threshold as
  "needs a full check".
- It slightly **over-predicts** DF on average, so a comfortable pass is more
  trustworthy than a marginal one.
- The official simulation and report for a permit application come from
  [LUX Certify](https://docs.upskiller.xyz/docs/lux-certify/intro).

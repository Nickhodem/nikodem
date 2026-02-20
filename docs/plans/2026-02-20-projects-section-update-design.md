# Design: Update Selected Work Section from CV

**Date:** 2026-02-20

## Goal

Replace the 4 placeholder projects in `ProjectsSection.tsx` with real publications and patents from the CV.

## Content

| # | Title | Description | Tags | Status | href |
|---|---|---|---|---|---|
| 1 | Attribution Analysis of RL-Based Highway Driver | Published in Electronics (MDPI), 2022. Attribution analysis using Shapley values of RL policies for highway driving behavior. | `Reinforcement Learning` `Explainability` `PyTorch` `MDPI` | `paper` | https://doi.org/10.3390/electronics11213599 |
| 2 | Highway Pilot Training from Demonstration | Published at 25th IEEE MMAR, 2021. Imitation learning approach for training highway driving agents from expert demonstrations. | `Imitation Learning` `PyTorch` `IEEE` `Highway Pilot` | `paper` | https://ieeexplore.ieee.org/abstract/document/9528436/ |
| 3 | Method and System for Planning the Motion of a Vehicle | Granted US Patent 11,584,393 (2023). ML-based vehicle trajectory planning for simultaneous nominal and abort trajectory optimization. | `Motion Planning` `C++` `Automotive` `US Patent` | `patent` | https://patents.google.com/patent/US11584393B2 |
| 4 | Driving Trajectory as Training Data for ML-Based ACC | US Patent Application 17/938,232 (2023). Method for generating driving trajectory training data for adaptive cruise control systems. | `Adaptive Cruise` `ML Training` `Trajectory` `US Patent` | `patent` | https://scholar.google.com/citations?user=zxKsQgcAAAAJ&hl=pl (fallback — exact patent URL TBD) |

## Component Changes

### `statusColors` — add two new statuses:
- `paper`: green accent style (similar to current `published`)
- `patent`: amber/yellow style

### Project card — add `href` field:
- Wrap card in `<a href={project.href} target="_blank" rel="noopener noreferrer">` when `href` is set
- The `ExternalLink` icon becomes a real link indicator

### No structural changes to the card layout.

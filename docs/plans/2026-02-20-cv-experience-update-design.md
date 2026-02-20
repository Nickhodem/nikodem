# Design: Update Experience Content from CV

**Date:** 2026-02-20

## Goal

Update `BioSection.tsx` and `HeroSection.tsx` to reflect the accurate work history and job title from the CV.

## Changes

### BioSection.tsx — `experience` array

Replace the current 2-entry array with 3 entries matching the CV:

| # | Role | Org | Detail | Icon | Current |
|---|---|---|---|---|---|
| 1 | Senior Machine Learning Engineer | Luxoft / Hayden AI | Training CV models for traffic situation awareness; enhancing localization with vision embeddings; AWS/SQL for operational data | `Eye` | true |
| 2 | Advanced Machine Learning Engineer | Aptiv | RL for vehicle motion planning (ACC, Highway Chauffeur, Valet Parking); sim2real transfer; trajectory prediction; C++/Rust on embedded | `Car` | false |
| 3 | R&D Developer | Flytech UAV | SLAM for UAVs (vision + LiDAR); Ground Control Station; spatial products from UAV imagery | `Cpu` | false |

Add `Cpu` to the lucide-react import (replacing `FlaskConical` which is no longer used).

### HeroSection.tsx — subtitle line

Change:
```
Senior Computer Vision Engineer @ Hayden AI
```
To:
```
Senior Machine Learning Engineer @ Luxoft / Hayden AI
```

### Out of scope

- Skills section: unchanged
- ProjectsSection: unchanged
- Any other component

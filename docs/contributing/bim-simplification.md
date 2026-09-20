---
unlisted: true
sidebar_position: 3
---

# Testing hypothesis

## What to send

Test results for different levels of geometry simplification in BIM models and their impact on IFC file size.

## Test Setup

Three Revit files (three buildings) linked together representing a single project. Combined Revit file size: 571 MB (179 + 289 + 116 MB).

IFC export metadata reduced to IFC basics. No Revit property sets included.

## Simplification Levels

### Level 1: Category Filtering

**Method** - Export only: walls (external), windows, doors, columns, roofs, floor slabs

**Note** - No distinction between interior and exterior windows and doors

**Result** - 28.2 MB

### Level 2: Volume Replacement

**Method** - As Level 1, but linked models replaced by simple volumes (roof surfaces extruded downward)

**Note** - Smaller building parts missing where floor slabs form upper boundaries

**Result** - 5.8 MB (reduction: 79% from Level 1)

### Level 3: Wall BBox Replacement

**Method** - As Level 2, but wall geometries replaced by bounding boxes

**Note** - BBoxes remove wall connections and create inaccuracies. Rooms lost during export due to geometric inconsistencies.

**Result** - 3.6 MB (reduction: 38% from Level 2)

### Level 4: Window/Door BBox Replacement

**Method** - As Level 3, but windows and doors replaced by bounding boxes

**Note** - File size increases. Probable cause: replacing small number of reused instances with large number of unique BBoxes.

**Result** - 4.8 MB (increase: 33% from Level 3)

### Level 5: Essential Geometry Only

**Method** - Send only essential geometric primitives:

- Floor area instead of full room geometry
- Window reveal area instead of full window geometry
- Minimal representation of other elements

**Status** - Not tested

## Findings

**Optimal simplification** - Level 3 (3.6 MB, 99.4% reduction from original) provides best file size while maintaining essential geometry.

**Instance vs unique geometry** - Replacing instanced elements (windows, doors) with unique BBoxes increases file size.

**Room geometry dependency** - Aggressive wall simplification breaks room boundaries, resulting in lost room data.

## Upload Performance

Performance test: each file uploaded 10 times, measuring client round-trip time.

| File                            | Size (MB) | Avg Time (ms) | Std Dev (ms) | Min (ms) | Max (ms) |
| ------------------------------- | --------- | ------------- | ------------ | -------- | -------- |
| Level 1 (A-40-V-100A_1_Max.ifc) | 28.2      | 3513          | 183          | 3209     | 3916     |
| Level 2 (A-40-V-100A_2.ifc)     | 5.8       | 688           | 29           | 656      | 752      |
| Level 4 (A-40-V-100A_4.ifc)     | 4.8       | 616           | 21           | 590      | 652      |
| Level 3 (A-40-V-100A_3.ifc)     | 3.6       | 465           | 21           | 427      | 493      |

**Maximum upload time**: 3.5 seconds (Level 1, 28.2 MB file)

**Maximum standard deviation**: 183 ms (Level 1). Standard deviation decreases with file size, reaching 21 ms for smaller files (Level 3, Level 4).

**Performance is consistent**: Low variability across all simplification levels. Even the largest file maintains acceptable upload times (3.2-3.9 seconds).

## Metrics Definitions

**Server upload time** - Time from request handler start to file loaded in memory. Server processing time only.

**Client round-trip time** - Total time from request sent to response received. Includes network latency, server processing, and response transmission.

**Network overhead** - Round-trip time minus server time. Time spent in network transmission and protocol overhead.

**Standard deviation** - Variability in upload times across multiple uploads. Lower values indicate more consistent performance.

**Coefficient of Variation (CV)** - Relative variability as percentage. CV = (std / mean) × 100. Lower CV indicates more consistent performance.

## Recommendations

For file transfer optimization:

Use Level 2 or Level 3 depending on whether room data is required. Level 2 maintains rooms (5.8 MB). Level 3 achieves smaller size but loses rooms (3.6 MB).

Avoid replacing instanced elements with unique geometries (Level 4).

Consider Level 5 for applications that can work with parametric representations instead of full geometry.

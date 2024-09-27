import {
  ellipse,
  ellipseSegmentInterceptPoints,
  ellipseIncludesPoint,
  ellipseTouchesPoint,
} from "./ellipse";
import { point } from "./point";
import { segment } from "./segment";
import type { Ellipse, GlobalPoint } from "./types";

describe("point and ellipse", () => {
  it("point on ellipse", () => {
    const target: Ellipse<GlobalPoint> = ellipse(point(1, 2), 2, 1);
    [point(1, 3), point(1, 1), point(3, 2), point(-1, 2)].forEach((p) => {
      expect(ellipseTouchesPoint(p, target)).toBe(true);
    });
    expect(ellipseTouchesPoint(point(-0.4, 2.7), target, 0.1)).toBe(true);
    expect(ellipseTouchesPoint(point(-0.4, 2.71), target, 0.01)).toBe(true);

    expect(ellipseTouchesPoint(point(2.4, 2.7), target, 0.1)).toBe(true);
    expect(ellipseTouchesPoint(point(2.4, 2.71), target, 0.01)).toBe(true);

    expect(ellipseTouchesPoint(point(2, 1.14), target, 0.1)).toBe(true);
    expect(ellipseTouchesPoint(point(2, 1.14), target, 0.01)).toBe(true);

    expect(ellipseTouchesPoint(point(0, 1.14), target, 0.1)).toBe(true);
    expect(ellipseTouchesPoint(point(0, 1.14), target, 0.01)).toBe(true);

    expect(ellipseTouchesPoint(point(0, 2.8), target)).toBe(false);
    expect(ellipseTouchesPoint(point(2, 1.2), target)).toBe(false);
  });

  it("point in ellipse", () => {
    const target: Ellipse<GlobalPoint> = ellipse(point(0, 0), 2, 1);
    [point(0, 1), point(0, -1), point(2, 0), point(-2, 0)].forEach((p) => {
      expect(ellipseIncludesPoint(p, target)).toBe(true);
    });

    expect(ellipseIncludesPoint(point(-1, 0.8), target)).toBe(true);
    expect(ellipseIncludesPoint(point(1, -0.8), target)).toBe(true);

    // Point on outline
    expect(ellipseIncludesPoint(point(2, 0), target)).toBe(true);

    expect(ellipseIncludesPoint(point(-1, 1), target)).toBe(false);
    expect(ellipseIncludesPoint(point(-1.4, 0.8), target)).toBe(false);
  });
});

describe("line and ellipse", () => {
  it("detects outside segment", () => {
    const e = ellipse(point(0, 0), 2, 2);

    expect(
      ellipseSegmentInterceptPoints(
        e,
        segment<GlobalPoint>(point(-100, 0), point(-10, 0)),
      ),
    ).toEqual([]);
    expect(
      ellipseSegmentInterceptPoints(
        e,
        segment<GlobalPoint>(point(-10, 0), point(10, 0)),
      ),
    ).toEqual([point(-2, 0), point(2, 0)]);
    expect(
      ellipseSegmentInterceptPoints(
        e,
        segment<GlobalPoint>(point(-10, -2), point(10, -2)),
      ),
    ).toEqual([point(0, -2)]);
    expect(
      ellipseSegmentInterceptPoints(
        e,
        segment<GlobalPoint>(point(0, -1), point(0, 1)),
      ),
    ).toEqual([]);
  });
});
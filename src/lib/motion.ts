/** The only easing on the site (CLAUDE.md rule 4). */
export const EASE = [0.24, 0.43, 0.15, 0.97] as const;

/**
 * Clamped linear map, for scroll-linked values. Use it inside a function-form
 * `useTransform(progress, (p) => mapRange(p, [a, b], [c, d]))` rather than the
 * array form: motion 12 hands array-form opacity transforms to a native
 * ViewTimeline and drops the input range (the fade runs over the whole section).
 */
export function mapRange(
  value: number,
  [inMin, inMax]: readonly [number, number],
  [outMin, outMax]: readonly [number, number],
): number {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * t;
}

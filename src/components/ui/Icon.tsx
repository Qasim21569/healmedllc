import { cn } from "@/lib/utils";

const paths = {
  arrow: "M3 8h9M8.5 4.5 12 8l-3.5 3.5",
  "arrow-down": "M8 3v9M4.5 8.5 8 12l3.5-3.5",
  "arrow-up-right": "M4.5 11.5l7-7M5.5 4.5h6v6",
  phone:
    "M4.2 2.5h2l1 2.6-1.3.9a7 7 0 0 0 3.1 3.1l.9-1.3 2.6 1v2a1.4 1.4 0 0 1-1.5 1.4A10 10 0 0 1 2.8 4a1.4 1.4 0 0 1 1.4-1.5Z",
  mail: "M2.5 4h11v8h-11zM2.5 4.5 8 8.5l5.5-4",
  plus: "M8 3v10M3 8h10",
  close: "M4 4l8 8M12 4l-8 8",
  camera:
    "M2.5 5h2.2l1.1-1.5h4.4L11.3 5h2.2v7.5h-11zM8 10.8a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  pin: "M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 0 0-9 0C3.5 9.8 8 14 8 14Zm0-6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  upload: "M8 11V3M4.5 6.5 8 3l3.5 3.5M3 13h10",
} as const;

export type IconName = keyof typeof paths;

/** 16px line icons, stroke = currentColor. Decorative unless `label` is set. */
export function Icon({
  name,
  className,
  label,
}: {
  name: IconName;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

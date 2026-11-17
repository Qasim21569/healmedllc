import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { SmartLink } from "./SmartLink";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 type-small " +
  "transition-[background-color,color,border-color] duration-300 ease-heal " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-hover",
  outline: "border border-current text-ink hover:bg-ink hover:text-canvas",
  ghost: "px-0 text-ink underline-offset-4 hover:underline",
};

/**
 * Button (PLAYBOOK §3.2). 48px tall, pill, arrow icon that nudges on hover.
 * Primary is `bg-brand text-on-brand`, which on brand sections resolves to
 * logo-white with violet text. `href` renders a SmartLink; otherwise a button.
 * `block` makes it 52px and full width below 768px (stacked hero buttons).
 */
export function Button({
  children,
  href,
  variant = "primary",
  icon = "arrow",
  external,
  block = false,
  type = "button",
  disabled,
  onClick,
  className,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  icon?: IconName | null;
  external?: boolean;
  block?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const classes = cn(base, variants[variant], block && "max-md:min-h-13 max-md:w-full", className);

  const iconName = external && icon === "arrow" ? "arrow-up-right" : icon;
  const content = (
    <>
      <span>{children}</span>
      {iconName && (
        <Icon
          name={iconName}
          className="transition-transform duration-300 ease-heal group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <SmartLink href={href} external={external} className={classes}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}

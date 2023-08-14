import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ClassValue } from "class-variance-authority/dist/types";
import * as React from "react";
import type { IconType } from "react-icons";
import { cn } from "../../utils/general";

const Spinner = ({ w }: { w: string }) => <div className={w}>Spinner</div>;

export const INPUT_SIZE_CLASSES = {
  xs: "h-6 px-2 rounded-sm text-xs",
  sm: "h-8 px-4 rounded-sm text-sm",
  base: "h-10 px-6 rounded-sm text-base",
  lg: "h-11 px-8 rounded-sm text-base",
  xl: "h-12 px-12 rounded-sm text-lg",
};

export const BUTTON_BASE_STYLES: ClassValue[] = [
  "relative active:scale-[0.98] flex items-center justify-center font-medium transition-colors data-[state=open]:bg-zinc-100 ",
  "disabled:opacity-30 disabled:pointer-events-none",
  "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
];

export const VARIANT_STYLES = {
  default: ["bg-zinc-900 text-white hover:bg-zinc-700"],
  destructive:
    "bg-white border border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-red-50",
  outline: ["border text-zinc-900 border-zinc-200 hover:bg-zinc-100 bg-white"],
  subtle: ["bg-zinc-100 text-zinc-900 hover:bg-zinc-200"],
  ghost: [
    "bg-transparent hover:bg-zinc-900/10 data-[state=open]:bg-transparent border-none",
  ],
  link: [
    "bg-transparent underline-offset-4 hover:underline text-zinc-900 hover:bg-transparent",
  ],
};

const buttonVariants = cva(BUTTON_BASE_STYLES, {
  variants: {
    variant: VARIANT_STYLES,
    size: {
      xs: ["gap-1", INPUT_SIZE_CLASSES.xs],
      sm: ["gap-2", INPUT_SIZE_CLASSES.sm],
      base: ["gap-3", INPUT_SIZE_CLASSES.base],
      lg: ["gap-4", INPUT_SIZE_CLASSES.lg],
      xl: ["gap-6", INPUT_SIZE_CLASSES.xl],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  Icon?: IconType;
  RightIcon?: IconType;
  isLoading?: boolean;
  isDisabled?: boolean;
  innerTextClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      Icon,
      RightIcon,
      innerTextClassName,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const resolvedIcon = Icon ? (
      <div className={isLoading ? "invisible" : ""}>
        <Icon />
      </div>
    ) : null;

    const resolvedRightIcon = RightIcon ? (
      <div className={isLoading ? "invisible" : ""}>
        <RightIcon />
      </div>
    ) : null;

    const wrappedChildren = children ? (
      <div
        className={cn(
          "whitespace-nowrap",
          isLoading && "invisible",
          isLoading && !Icon && "!ml-0",
          isLoading && !RightIcon && "!mr-0",
          innerTextClassName
        )}
      >
        {children}
      </div>
    ) : null;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isDisabled || props.disabled}
      >
        {resolvedIcon}
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 !m-0 -translate-x-1/2 -translate-y-1/2">
            <Spinner
              w={size === "xs" ? "w-3" : size === "sm" ? "w-4" : "w-5"}
            />
          </div>
        )}
        {wrappedChildren}
        {resolvedRightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

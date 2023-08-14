import React, { forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ClassValue } from "class-variance-authority/dist/types";
import { cn } from "../../utils/general";
import { INPUT_SIZE_CLASSES, VARIANT_STYLES } from "./Button";

export const INPUT_BASE_CLASSES: ClassValue[] = [
  "flex w-full rounded-smitems-center py-0 placeholder:text-zinc-400",
  "disabled:cursor-not-allowed disabled:opacity-30",
  "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:border-zinc-300",
];

const inputVariants = cva(INPUT_BASE_CLASSES, {
  variants: {
    size: INPUT_SIZE_CLASSES,
    variant: {
      ...VARIANT_STYLES,
      outline: [VARIANT_STYLES.outline, "hover:bg-white"],
    },
  },
  defaultVariants: {
    size: "base",
    variant: "outline",
  },
});

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      placeholder,
      error,
      isDisabled,
      disabled,
      isRequired,
      required,
      size,
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const resolvedRequired = isRequired || required;
    const resolvedDisabled = isDisabled || disabled;
    const resolvedPlaceholder = placeholder || label;

    return (
      <label className={cn("block flex-1 gap-1 text-sm font-light")}>
        {label && error ? (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                resolvedRequired &&
                  "after:ml-0.5 after:text-red-600 after:content-['*'] "
              )}
            >
              {label}
            </span>
            <span className="text-red-600">{error}</span>
          </div>
        ) : label ? (
          <span
            className={cn(
              resolvedRequired &&
                "after:ml-0.5 after:text-red-600 after:content-['*'] "
            )}
          >
            {label}
          </span>
        ) : null}
        <div className="relative ">
          <input
            className={cn(
              inputVariants({ size, className, variant }),
              error
                ? "invalid:outline-none invalid:ring-2 invalid:ring-red-600 invalid:ring-offset-2"
                : null
            )}
            {...props}
            required={resolvedRequired}
            disabled={resolvedDisabled}
            placeholder={resolvedPlaceholder}
            ref={ref}
          />
        </div>
      </label>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

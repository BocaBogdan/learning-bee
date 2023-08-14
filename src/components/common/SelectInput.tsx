import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../utils/general";
import { INPUT_SIZE_CLASSES, VARIANT_STYLES } from "./Button";
import { INPUT_BASE_CLASSES } from "./TextInput";

const selectVariants = cva(INPUT_BASE_CLASSES, {
  variants: {
    variant: VARIANT_STYLES,
    size: {
      xs: [INPUT_SIZE_CLASSES.xs, "pr-10"],
      sm: [INPUT_SIZE_CLASSES.sm, "pr-10"],
      base: [INPUT_SIZE_CLASSES.base, "pr-10"],
      lg: [INPUT_SIZE_CLASSES.lg, "pr-10"],
      xl: [INPUT_SIZE_CLASSES.xl, "pr-10"],
    },
  },
  defaultVariants: {
    size: "base",
    variant: "outline",
  },
});

interface SelectInputProps
  extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  label?: string;
  options: { value: string | number; label: string | number }[];
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      placeholder,
      error,
      size = "base",
      options,
      className,
      isDisabled,
      isRequired,
      required,
      disabled,
      variant,
      ...props
    },
    ref
  ) => {
    const resolvedRequired = isRequired || required;
    const resolvedDisabled = isDisabled || disabled;

    return (
      <label className={cn("block gap-1 font-light")}>
        {label && (
          <div className="flex items-center justify-between text-sm">
            <span
              className={cn(
                resolvedRequired &&
                  "after:ml-0.5 after:text-red-600 after:content-['*']"
              )}
            >
              {label}
            </span>
            {error && <span className="font-sm text-red-600">{error}</span>}
          </div>
        )}
        <div className="relative">
          <select
            {...props}
            disabled={resolvedDisabled}
            placeholder={placeholder}
            required={resolvedRequired}
            className={cn(
              selectVariants({ size, className, variant }),
              error
                ? "invalid:outline-none invalid:ring-2 invalid:ring-red-600 invalid:ring-offset-2"
                : null
            )}
            ref={ref}
          >
            {placeholder && (
              <option disabled selected={!props.value} hidden value="">
                {placeholder}
              </option>
            )}
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
      </label>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;

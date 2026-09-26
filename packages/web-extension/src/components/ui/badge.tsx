import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#007ACC] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#007ACC] text-white shadow",
        secondary:
          "border-transparent bg-[#252526] text-[#CCCCCC]",
        destructive:
          "border-transparent bg-red-500 text-white shadow",
        outline: "border-[#3C3C3C] text-[#CCCCCC]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

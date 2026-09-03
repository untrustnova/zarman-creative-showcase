import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border text-sm font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
        primary: "border-primary bg-primary text-primary-foreground hover:bg-primary/85",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline:
          "border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        secondary: "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "border-transparent bg-transparent text-foreground hover:text-primary",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        icon: "border-border bg-background text-foreground hover:border-primary hover:text-primary",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant, size, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

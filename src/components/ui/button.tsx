import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 border text-sm font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary px-5 text-primary-foreground hover:bg-primary/85",
        outline: "border-border bg-transparent px-5 text-foreground hover:border-primary hover:text-primary",
        ghost: "border-transparent bg-transparent px-3 text-foreground hover:text-primary",
        icon: "size-11 border-border bg-background text-foreground hover:border-primary hover:text-primary",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ asChild = false, className, variant, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };

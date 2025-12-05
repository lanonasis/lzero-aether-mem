import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "default" | "sm" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost:
        "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]",
    };

    const sizeClasses = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import "../../styles/Button.css";

type ButtonVariant = "main" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "pill" | "md" | "sm" | "none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
}

export default function Button({
  children,
  variant = "main",
  size = "md",
  radius = "pill",
  className = "",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} btn--radius-${radius} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
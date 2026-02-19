import type React from "react";

type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyle =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default: "bg-black text-white hover:bg-black/90",

  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-900",

  outline: "border border-gray-300 bg-white hover:bg-gray-50",

  destructive: "bg-red-600 text-white hover:bg-red-700",

  ghost: "hover:bg-gray-100",

  link: "underline-offset-4 hover:underline text-black p-0 h-auto",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8",
  icon: "h-10 w-10",
};

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;
  return <button className={classes} {...props} />;
}

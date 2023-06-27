import { cn } from "@/utils/helpers";
import React from "react";

type ButtonProps = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
}) => (
  <button
    type={type}
    className={cn(className, "rounded-lg py-2 text-base font-semibold")}
    onClick={onClick}
  >
    {children}
  </button>
);
export default React.memo(Button);

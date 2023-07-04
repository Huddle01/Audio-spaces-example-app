import { InputIcons } from "@/assets/InputIcons";
import { cn } from "@/utils/helpers";
import React, { ChangeEvent } from "react";

type CustomInputProps = {
  type: string;
  className?: string;
  name?: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  className,
  name,
  value,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-rgbColors-2 rounded-lg p-2",
        className
      )}
    >
      <div>{InputIcons[type]}</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className="bg-transparent focus:outline-none border-none placeholder:text-slate-500 text-sm font-normal text-slate-50"
      />
    </div>
  );
};
export default React.memo(CustomInput);

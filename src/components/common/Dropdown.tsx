import React from "react";

// Radix ui
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DropdownProps = {
  triggerChild: JSX.Element;
  children: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ children, triggerChild }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <span>{triggerChild}</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={5}
        className="relative bg-custom-3 border border-custom-4 rounded-xl p-3"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default Dropdown;

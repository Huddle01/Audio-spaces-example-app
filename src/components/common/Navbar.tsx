"use client";

import React from "react";
import Image from "next/image";
import { useHuddle01 } from "@huddle01/react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { roomState } = useHuddle01();
  return (
    <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100 justify-between">
      <Image
        src="/images/Logo.png"
        alt="logo"
        width={180}
        height={180}
        className="object-contain"
        quality={100}
        priority
      />
    </header>
  );
};
export default Navbar;

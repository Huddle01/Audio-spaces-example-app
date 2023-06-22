import React from "react";
import Image from "next/image";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => (
  <header className="border-b border-custom-1 w-full absolute top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100">
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
export default Navbar;

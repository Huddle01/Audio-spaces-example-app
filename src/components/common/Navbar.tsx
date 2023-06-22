"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  // Todo: Rm After Testing
  const Test = [{ id: "1" }, { id: "2" }];

  const { push } = useRouter();

  return (
    <header className="border-b border-custom-1 w-full fixed top-0 left-0 h-16 flex items-center px-10 z-10 text-slate-100">
      <Image
        src="/images/Logo.png"
        alt="logo"
        width={180}
        height={180}
        className="object-contain"
        quality={100}
        priority
      />

      {/* Todo: Removing After Testing */}
      {Test.map(({ id }) => (
        <button type="button" onClick={() => push(`/${id}`)} key={id}>
          Test Click
        </button>
      ))}

      {/* Todo: Removing After Testing */}
      <button type="button" onClick={() => push("/")}>
        Go Back
      </button>
    </header>
  );
};
export default Navbar;

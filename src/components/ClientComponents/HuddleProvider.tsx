"use client";

import dynamic from "next/dynamic";
import React from "react";

const Toaster = dynamic(
  () => import("react-hot-toast").then((m) => m.Toaster),
  {
    ssr: false,
  }
);

type ToasterProps = {
  children: React.ReactNode;
};

const HuddleProvider: React.FC<ToasterProps> = ({ children }) => {
  return (
    <main>
      {children}
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: "70px",
          animation: "ease-in-out",
          animationFillMode: "forwards",
        }}
        toastOptions={{
          style: {
            padding: "1.2rem 1rem",
          },
          duration: 5000,
          success: {
            style: {
              border: "1px solid #3CCB7F",
              backgroundColor: "#121214",
              color: "#3CCB7F",
            },
          },
          error: {
            style: {
              border: "1px solid #F87171",
              background: "black",
              color: "#F87171",
            },
          },
        }}
      />
    </main>
  );
};
export default HuddleProvider;

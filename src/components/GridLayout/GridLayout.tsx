import React from "react";
import GridCard from "./GridCard/GridCard";

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  return (
    <div className="w-full h-full ml-10 flex items-center justify-center flex-col py-20">
      <div className="flex-wrap flex items-center justify-center gap-4 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <GridCard key={i} />
        ))}
      </div>
      <div className="mt-10">
        <div className="text-custom-6 text-base font-normal text-center mb-5">
          Listeners - count
        </div>
        <div className="flex-wrap flex items-center justify-center gap-4 w-full">
          {Array.from({ length: 26 }).map((_, i) => (
            <GridCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GridLayout;

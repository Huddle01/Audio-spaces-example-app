import React from "react";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  return (
    <div className="absolute bottom-5 w-full flex items-center px-10">
      <div className="mr-auto">Recording/Leave Role</div>
      <div className="mx-auto">Mic/Cam/Leave</div>
      <div className="ml-auto">Peers</div>
    </div>
  );
};
export default BottomBar;

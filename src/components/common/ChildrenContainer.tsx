import React from "react";

type ChildrenContainerProps = {
  children: React.ReactNode;
};

const ChildrenContainer: React.FC<ChildrenContainerProps> = ({ children }) => {
  return (
    <div
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      className="bg-custom-2 p-6 border border-custom-1 rounded-xl shadow-xl"
    >
      {children}
    </div>
  );
};
export default ChildrenContainer;

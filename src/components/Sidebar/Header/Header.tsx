import React from "react";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return <div className="px-6 py-3">Header</div>;
};
export default React.memo(Header);

import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const iconHeight = {
  bg: "h-52",
  vr: "h-[36rem]",
  avatar: "h-80",
};

const FeatCommon = ({ onClose, children, className }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      className={
        "bg-custom-navy absolute top-1/2 -right-5  z-50 h-fit w-[16rem] lg:w-[28rem] -translate-y-[30%] translate-x-full rounded-3xl border  border-slate-700 py-4 text-center text-white shadow-xl " +
        className
      }
    >
      <div className="flex justify-between items-center border-b border-b-slate-700 px-8 pb-2.5">
        <div className="flex items-center">
          <div className="ml-2  font-medium text-slate-300">Select your Avatar</div>
        </div>
        <div className="cursor-pointer" onClick={onClose} role="presentation">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9131 1.95312C7.39029 1.95312 2.91309 6.43013 2.91309 11.9531C2.91309 17.4761 7.39029 21.9531 12.9131 21.9531C18.4361 21.9531 22.9131 17.4761 22.9131 11.9531C22.9131 6.43013 18.4361 1.95312 12.9131 1.95312ZM9.91309 7.95312C10.1689 7.95312 10.4366 8.03913 10.6319 8.23413L12.9131 10.5151L15.1941 8.23413C15.3901 8.03913 15.6571 7.95312 15.9131 7.95312C16.1691 7.95312 16.4361 8.03913 16.6321 8.23413C17.0221 8.62513 17.0221 9.28112 16.6321 9.67212L14.3511 11.9531L16.6321 14.2341C17.0221 14.6251 17.0221 15.2811 16.6321 15.6721C16.2411 16.0621 15.5851 16.0621 15.1941 15.6721L12.9131 13.3911L10.6319 15.6721C10.2414 16.0621 9.58488 16.0621 9.19428 15.6721C8.80378 15.2811 8.80378 14.6251 9.19428 14.2341L11.4751 11.9531L9.19428 9.67212C8.80378 9.28112 8.80378 8.62513 9.19428 8.23413C9.38968 8.03913 9.65719 7.95312 9.91309 7.95312Z"
              fill="#475569"
            />
          </svg>
        </div>
      </div>

      {/* Check to set the height for custom-bg lobby box */}
      <div
        className={`scrollBoxDark gap-1 overflow-y-auto px-6 ${
          "h-80"
        }`}
      >
        {children}
      </div>

      <div className="absolute inset-0 top-1/2 h-0 w-0 -translate-x-full rounded-xl border-[10px] border-l-0 border-transparent border-r-slate-700 ">
        <div className="absolute top-1/2 left-0 h-0 w-0 translate-x-[2px] -translate-y-1/2 rounded-xl border-[10px] border-l-0 border-transparent border-r-zinc-900 " />
      </div>
    </div>
  );
};

export default React.memo(FeatCommon);

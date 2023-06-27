import { cn } from "@/utils/helpers";
import React, { useCallback } from "react";

// import { useClient } from "@/store/atom/socket.atom";
// import useHuddleStore from "@/store/index";
// import { cn } from "@/utils/helper";

// Assets
// import BtmBarIcons from "../BtmBarIcons";

type Reaction =
  | ""
  | "😂"
  | "😢"
  | "😦"
  | "😍"
  | "🤔"
  | "👀"
  | "🙌"
  | "👍"
  | "👎"
  | "🔥"
  | "🍻"
  | "🚀"
  | "🎉"
  | "❤️"
  | "💯";

interface Props {
  onClick: (reaction: Reaction) => void;
}

const EmojiTray: React.FC<Props> = ({ onClick }) => {
  const isHandRaised = true;
  // Emoji Data
  const emojis: Reaction[] = [
    "😂",
    "😢",
    "😦",
    "😍",
    "🤔",
    "👀",
    "🙌",
    "👍",
    "👎",
    "🔥",
    "🍻",
    "🚀",
    "🎉",
    "❤️",
    "💯",
  ];

  return (
    <div>
      <div className="relative">
        <div className=" border-b-[1px] border-slate-700 py-3 text-center text-sm font-semibold text-slate-100">
          Reactions
          <span className="absolute right-2 cursor-pointer">close</span>
        </div>
      </div>
      <div className="px-4 py-3.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            alert("todo");
          }}
          className={cn(
            " w-full text-sm text-slate-100 py-2 rounded-lg font-inter flex items-center justify-center font-medium",
            isHandRaised ? "bg-custom-1" : "bg-custom-8"
          )}
        >
          ✋ {isHandRaised ? "Lower Hand" : "Raise Hand"}
        </button>
        <div className="grid grid-cols-5 place-items-center gap-2">
          {emojis.map((emoji) => (
            <span
              key={emoji}
              onClick={() => onClick(emoji)}
              role="presentation"
              className="m-1 cursor-pointer p-2 text-lg"
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiTray;

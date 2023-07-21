import { BasicIcons } from "@/assets/BasicIcons";
import { cn } from "@/utils/helpers";
import React, {useEffect, useState} from "react";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from "@huddle01/react/hooks";
import useStore from "@/store/slices";
import { useUpdateEffect } from "usehooks-ts";

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
  onClose: () => void;
  onClick: (reaction: Reaction) => void;
}

const EmojiTray: React.FC<Props> = ({ onClick, onClose }) => {
  const [isHandRaised, setIsHandRaised] = useState(false);
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

  const { me } = useHuddle01();
  const { sendData } = useAppUtils();
  const setMyHandRaised = useStore((state) => state.setMyHandRaised);
  const setMyReaction = useStore((state) => state.setMyReaction);

  useUpdateEffect(() => {
    sendData(
      "*", {
        raiseHand: isHandRaised,
      }
    )
    setMyHandRaised(isHandRaised);
  }, [isHandRaised])

  return (
    <div>
      <div className="relative">
        <div className=" border-b border-slate-700 py-3 text-center text-base font-semibold text-slate-100">
          Reactions
          <span
            className="absolute right-2 cursor-pointer"
            role="presentation"
            onClick={onClose}
          >
            {BasicIcons.close}
          </span>
        </div>
      </div>
      <div className="px-4 py-3.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsHandRaised((prev) => !prev);
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
              onClick={() => {
                sendData(
                  "*", {
                    reaction: emoji,
                  }
                )
                setMyReaction(emoji);
              }}
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

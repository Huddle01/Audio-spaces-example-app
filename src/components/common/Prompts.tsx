import React from "react";

// Common
import OverlayContainer from "./OverlayContainer";
import useStore from "@/store/slices";

type PromptsProps = {};

const Prompts: React.FC<PromptsProps> = () => {
  const promptView = useStore((state) => state.promptView);

  const setPromptView = useStore((state) => state.setPromptView);

  const prompt = {
    "request-to-speak": <div>Request to speak</div>,
  } as const;

  if (promptView === "close") return null;

  return (
    <OverlayContainer onClick={() => setPromptView("close")}>
      {prompt[promptView]}
    </OverlayContainer>
  );
};
export default React.memo(Prompts);

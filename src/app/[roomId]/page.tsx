import React from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";

const Audio = ({ params }: { params: { roomId: string } }) => {
  return (
    <section className="bg-audio flex h-screen flex-col relative items-center justify-center text-slate-100">
      <div>Host</div>
      <div>
        <h1>Listeners - 2</h1>
      </div>

      <BottomBar />
    </section>
  );
};
export default Audio;

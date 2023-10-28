import type { FC } from "react";
import { useState } from "react";
import DropdownMenu from "./components/DropdownMenu";
import Modal from "../Modals/SwitchModal";
import { NestedBasicIcons } from "@/assets/BasicIcons";
import { HiSpeakerWave } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const SwitchModal: FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
      <button
        type="button"
        title="switch_device"
        onClick={() => setShowSettings(!showSettings)}
        className="flex h-10 w-10 items-center hover:bg-white/20 justify-center rounded-xl"
      >
        <IoSettingsOutline className="flex h-[40px] w-[40px] p-2.5 bg-[#181A20] text-gray-400 items-center justify-center rounded-md" />
      </button>
      <Modal show={showSettings} onClose={() => setShowSettings(false)}>
        <div className="bg-[#181A20] rounded-xl p-4">
          <div className="mt-3 flex items-center gap-1 self-stretch text-slate-500">
            <div className="w-9 h-fit flex justify-start items-center">
              {NestedBasicIcons.active.mic}
            </div>
            <div className="flex h-fit items-center justify-between self-stretch">
              <DropdownMenu deviceType={"audioInput"} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 self-stretch text-slate-500">
            <div className="w-9 h-fit flex justify-start items-center">
              {
                <HiSpeakerWave className="flex h-[40px] w-[40px] p-2 bg-[#181A20] text-gray-400 items-center justify-center rounded-md" />
              }
            </div>
            <div className="flex h-fit items-center justify-between self-stretch">
              <DropdownMenu deviceType={"audioOutput"} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SwitchModal;

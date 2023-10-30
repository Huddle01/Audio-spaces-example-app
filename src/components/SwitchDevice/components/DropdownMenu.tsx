import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { useAudioPersistStore } from "../../../store/audio";
import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import DeviceList from "./DeviceList";

type DropDownProps = {
  deviceType: "audioInput" | "audioOutput";
};

const DropDownMenu: FC<DropDownProps> = ({ deviceType }) => {
  const {
    setAudioInputDevice,
    audioInputDevice,
    audioOutputDevice,
    setAudioOutputDevice,
  } = useAudioPersistStore();

  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    MediaDeviceInfo[]
  >([]);

  useEffect(() => {
    const listMediaDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        const audioOutputDevices = devices.filter(
          (device) => device.kind === "audiooutput"
        );

        setAudioInputDevices(audioInputDevices);
        setAudioOutputDevices(audioOutputDevices);

        if (!audioInputDevice.deviceId) {
          setAudioInputDevice(audioInputDevices[0]);
        }
        if (!audioOutputDevice.deviceId) {
          setAudioOutputDevice(audioOutputDevices[0]);
        }
      } catch (error) {
        console.error("Error listing media devices:", error);
      }
    };

    listMediaDevices();
  }, [
    audioInputDevice.deviceId,
    audioOutputDevice.deviceId,
    setAudioInputDevice,
    setAudioOutputDevice,
  ]);

  return (
    <Menu as="div" className="w-full h-full relative inline-block text-left">
      <div>
        <Menu.Button className="w-full h-full inline-flex bg-gray-950 text-gray-300 border border-neutral-600 justify-start gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset">
          {deviceType == "audioInput"
            ? audioInputDevice?.label
            : audioOutputDevice?.label}
          <BsChevronDown
            className="mr-0 ml-1 mt-[2px] h-4 w-4 text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 bg-gray-950 w-full origin-top-right rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="w-full h-full">
            {deviceType === "audioInput" && (
              <DeviceList
                devices={audioInputDevices}
                setDevice={setAudioInputDevice}
              />
            )}
            {deviceType === "audioOutput" && (
              <DeviceList
                devices={audioOutputDevices}
                setDevice={setAudioOutputDevice}
              />
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDownMenu;

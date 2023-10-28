import { Menu } from "@headlessui/react";
import type { FC } from "react";

type DeviceListProps = {
  devices: MediaDeviceInfo[];
  setDevice: (device: MediaDeviceInfo) => void;
};

const DeviceList: FC<DeviceListProps> = ({ devices, setDevice }) => {
  return (
    <div className="overflow-clip w-full h-full">
      {devices.map((device) => (
        <Menu.Item key={device.deviceId}>
          {({ active }) => (
            <button
              type="button"
              className={`w-full h-full flex justify-start items-center px-4 py-2 text-sm ${
                !active ? "text-slate-300" : "bg-white/20 text-white"
              }`}
              key={device.deviceId}
              onClick={() => {
                setDevice(device);
              }}
            >
              {device.label}
            </button>
          )}
        </Menu.Item>
      ))}
    </div>
  );
};

export default DeviceList;

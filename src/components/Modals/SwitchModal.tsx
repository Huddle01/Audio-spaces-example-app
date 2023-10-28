import { FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Modal = ({ show, onClose, children }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    isVisible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="p-4 rounded-lg relative">
          <button
            title="close_modal"
            type="button"
            className="absolute top-2 right-2 flex h-6 w-6 p-1 bg-[#181A20] text-red-600 border border-neutral-500 hover:border-neutral-300 items-center justify-center rounded-full"
            onClick={onClose}
          >
            <FaXmark />
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;

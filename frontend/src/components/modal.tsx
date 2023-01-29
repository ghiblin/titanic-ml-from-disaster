import React from "react";
import cn from "classnames";
import Portal from "./portal";

interface ModalProps {
  show?: boolean;
  children: React.ReactNode;
  color?: "neutral" | "success" | "error";
  onClose: () => void;
}

export default function Modal({
  show,
  children,
  onClose,
  color = "neutral",
}: ModalProps) {
  if (!show) return null;
  return (
    <Portal wrapperId="modal">
      <div
        className="modal block fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto show  bg-slate-800/50"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog pointer-events-none relative w-auto">
          <div
            className={cn(
              "modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current",
              {
                "bg-neutral-100": color === "neutral",
                "bg-red-500": color === "error",
                "bg-green-500": color === "success",
              }
            )}
          >
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body relative p-4 text-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

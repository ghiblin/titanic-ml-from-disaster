import React from "react";
import cn from "classnames";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({
  label,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out",
        {
          "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800":
            !disabled,
          "bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-800 pointer-events-none cursor-not-allowed":
            disabled,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

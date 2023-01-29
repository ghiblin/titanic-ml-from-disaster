import React from "react";
import cn from "classnames";

interface TabProps {
  name: string;
  label: string;
  onSelect: (name: string) => void;
  active?: boolean;
}

export default function Tab({
  name,
  label,
  onSelect,
  active = false
}: TabProps) {
  return (
    <li className="nav-item" role="presentation">
      <a
        href={`#tabs-${name}`}
        className={cn(
          "nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent",
          { active }
        )}
        role="tab"
        aria-controls={`tabs-${name}`}
        aria-selected={active}
        onClick={() => onSelect(name)}
      >
        {label}
      </a>
    </li>
  );
}

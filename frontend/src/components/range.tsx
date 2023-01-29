import React from "react";

export type RangeProps = {
  label: string;
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function Range({
  label,
  value,
  name,
  min = 0,
  max,
  step = 1,
  onChange
}: RangeProps) {
  return (
    <div className="mb-3 xl:w-96 relative">
      <label
        htmlFor={name}
        className="form-label inline-block mb-2 text-gray-700"
      >
        {label} ({value})
      </label>
      <input
        type="range"
        className="form-range appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
        id={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

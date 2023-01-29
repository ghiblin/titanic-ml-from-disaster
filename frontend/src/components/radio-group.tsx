import React from "react";

export type Option = {
  label: string;
  value: string | number;
};
export type RadioGroupProps = {
  label: string;
  name: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
};

export default function RadioGroup({
  name,
  label,
  value,
  options,
  onChange
}: RadioGroupProps) {
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor={name}
        className="form-label inline-block mb-2 text-gray-700"
      >
        {label}
      </label>
      <div className="flex justify-center">
        {options.map(option => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor={`${name}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

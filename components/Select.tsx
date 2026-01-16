import { useState, ChangeEvent, FormEvent } from "react";


type SelectProps = {
  label: string;
  name: string;
  options: string[];
  selectedVal?: string;
  onChange: (
    e: ChangeEvent<HTMLSelectElement>
  ) => void;
};

export default function Select({ label, name, options, onChange, selectedVal }: SelectProps) {
  return (
    <div>
      <label className="block dark:text-white mb-1">{label}</label>
      <select
        name={name}
        onChange={onChange}
        required
        value={selectedVal}
        className="w-full px-3 py-2 rounded-xl bg-gray-800 dark:text-white border border-gray-600"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
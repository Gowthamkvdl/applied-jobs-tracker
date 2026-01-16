import { useState, ChangeEvent, FormEvent } from "react";


type InputProps = {
  label: string;
  name: string;
  type?: string;
  defaultVal?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};

export default function Input({ label, name, type = "text", defaultVal, onChange  }: InputProps) {
  return (
    <div>
      <label className="block dark:text-white text-black mb-1">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        defaultValue={defaultVal}
        className="w-full px-3 py-2 rounded dark:bg-gray-800 bg-gray-200  text-black dark:text-white border border-gray-600"
      />
    </div>
  );
}
import { useState, ChangeEvent, FormEvent } from "react";


type InputProps = {
  label: string;
  name: string;
  type?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};

export default function Input({ label, name, type = "text", onChange }: InputProps) {
  return (
    <div>
      <label className="block dark:text-white mb-1">{label}</label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        
        className="w-full px-3 py-2 rounded-2xl bg-gray-800 dark:text-white border border-gray-600"
      />
    </div>
  );
}
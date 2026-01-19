import { ChangeEvent } from "react";

type CheckBoxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBox({
  label,
  name,
  checked,
  onChange,
}: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2 text-black dark:text-white">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-blue-600 h-4 w-4"
      />
      {label}
    </label>
  );
}

import { setConfig } from "next/config";
import {
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
} from "react";

export interface DropdownProps {
  name: string;
  options: (string | number)[];
  value: string | number;
  onChange: (value: string) => void;
  title?: string;
}

export default function Dropdown({
  name,
  options,
  value,
  onChange,
  title,
}: DropdownProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div>
      {title && <h1>{title}</h1>}
      <select
        ref={selectRef}
        className="block bg-gray-100"
        name={title || name}
        id={title || name}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

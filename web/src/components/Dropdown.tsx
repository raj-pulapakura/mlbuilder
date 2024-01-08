import { ChangeEventHandler, ReactEventHandler } from "react";

export interface DropdownProps {
  name: string;
  options: (string | number)[];
  value: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  title?: string;
}

export default function Dropdown({
  name,
  options,
  value,
  onChange,
  title,
}: DropdownProps) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      <select
        className="block bg-gray-100"
        name={title || name}
        id={title || name}
        onChange={onChange}
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

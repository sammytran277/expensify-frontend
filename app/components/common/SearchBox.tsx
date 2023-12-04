import { ChangeEvent } from "react";

export default function SearchBox({
  onChange,
  placeholder,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}): JSX.Element {
  const classNames = [
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "focus:outline-none",
  ];
  return (
    <input
      onChange={onChange}
      className={classNames.join(" ")}
      type="text"
      name="search"
      placeholder={placeholder}
    />
  );
}

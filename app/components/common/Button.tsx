import { Undefinable } from "@/app/util/types";

export default function Button({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <button>{children}</button>;
}

function ButtonBlue({
  children,
  type = "button",
  onClick = undefined,
  extraClassNames = "",
}: {
  children: React.ReactNode;
  type?: Undefinable<"button" | "submit" | "reset">;
  onClick?: Undefinable<() => void>;
  extraClassNames?: string;
}): JSX.Element {
  const classNames = [
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "ml-4",
    "rounded",
    "focus:outline-none",
  ];
  return (
    <button
      className={`${classNames.join(" ")} ${extraClassNames}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ButtonWhite({
  children,
  type = "button",
  onClick = undefined,
  extraClassNames = "",
}: {
  children: React.ReactNode;
  type?: Undefinable<"button" | "submit" | "reset">;
  onClick?: Undefinable<() => void>;
  extraClassNames?: string;
}): JSX.Element {
  const classNames = [
    "border",
    "border-gray-300",
    "hover:bg-gray-100",
    "text-gray-700",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
  ];
  return (
    <button
      className={`${classNames.join(" ")} ${extraClassNames}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ButtonTrashIcon({
  onClick,
  extraClassNames = "",
}: {
  onClick: () => void;
  extraClassNames?: string;
}): JSX.Element {
  return (
    <button
      className={`hover:bg-gray-200 rounded-full p-2 ${extraClassNames}`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        className="fill-red-600"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
      </svg>
    </button>
  );
}

Button.Blue = ButtonBlue;
Button.White = ButtonWhite;
Button.TrashIcon = ButtonTrashIcon;

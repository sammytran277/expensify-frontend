import { FormEvent } from "react";

export default function Form({
  children,
  extraClassNames,
  onSubmit,
}: {
  children: React.ReactNode;
  extraClassNames?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}): JSX.Element {
  return (
    <form className={extraClassNames} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function FormLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}): JSX.Element {
  const classNames = [
    "block",
    "text-gray-700",
    "text-sm",
    "font-bold",
    "mb-2",
    "leading-tight",
  ];
  return (
    <label className={classNames.join(" ")} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

function FormInput({
  type,
  id,
  step = "any",
  placeholder = "",
  value = undefined,
  isRequired = true,
  isReadOnly = false,
  extraClassNames = "",
}: {
  type: string;
  id: string;
  step?: number | "any";
  placeholder?: string;
  value?: string | undefined;
  isRequired?: boolean;
  isReadOnly?: boolean;
  extraClassNames?: string;
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
    isReadOnly ? "bg-gray-100" : "",
  ];
  return (
    <input
      className={`${classNames.join(" ")} ${extraClassNames}`}
      type={type}
      step={step}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      required={isRequired}
      readOnly={isReadOnly}
    />
  );
}

function FormSelect({
  id,
  options,
}: {
  id: string;
  options: string[];
}): JSX.Element {
  const classNames = [
    "shadow",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "focus:outline-none",
  ];
  return (
    <select className={classNames.join(" ")} id={id} name={id}>
      {options.map((option: string, index: number): JSX.Element => {
        return (
          <option key={`option-${index}`} value={option.toUpperCase()}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

function FormTextArea({
  id,
  placeholder,
  isRequired = true,
}: {
  id: string;
  placeholder: string;
  isRequired?: boolean;
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
    <textarea
      className={classNames.join(" ")}
      id={id}
      name={id}
      placeholder={placeholder}
      required={isRequired}
    />
  );
}

Form.Label = FormLabel;
Form.Input = FormInput;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;

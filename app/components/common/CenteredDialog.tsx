import { Dialog } from "@headlessui/react";

export default function CenteredDialog({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  children: React.ReactNode;
}): JSX.Element {
  const classNames = [
    "absolute",
    "left-0",
    "right-0",
    "top-0",
    "bottom-0",
    "flex",
    "items-center",
    "justify-center",
  ];
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className={classNames.join(" ")}>
        <div className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Panel
          className="relative bg-white rounded mx-auto px-8 pt-6 pb-8 mb-4"
        >
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

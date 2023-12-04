export default function Navbar({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-row bg-white shadow-md px-32 py-6">
      {children}
    </div>
  );
}

function NavbarBrand({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <h1 className="flex items-center text-xl text-gray-700 font-bold">
      {children}
    </h1>
  );
}

Navbar.Brand = NavbarBrand;

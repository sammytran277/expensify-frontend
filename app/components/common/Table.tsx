export default function Table({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const classNames = [
    "bg-white",
    "w-full",
    "shadow-md",
    "border",
    "border-gray-300",
    "text-gray-700",
  ];
  return <table className={classNames.join(" ")}>{children}</table>;
}

function TableHeaders({ headers }: { headers: string[] }): JSX.Element {
  return (
    <thead>
      <tr className="bg-blue-500 text-white border border-gray-300">
        {headers.map((header, index) => {
          return (
            <th className="px-6 py-3" key={`table-header-${index}`}>
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function TableBody({ children }: { children: React.ReactNode }): JSX.Element {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <tr className="border border-gray-300 hover:bg-gray-100">{children}</tr>
  );
}

function TableData({
  children,
  extraClassNames = "",
}: {
  children: React.ReactNode;
  extraClassNames?: string;
}): JSX.Element {
  return <td className={`px-6 py-4 ${extraClassNames}`}>{children}</td>;
}

Table.Headers = TableHeaders;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Data = TableData;

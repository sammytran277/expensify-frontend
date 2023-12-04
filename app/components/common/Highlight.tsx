import { StatusState } from "@/app/util/types";

export default function Highlight({
  state,
}: {
  state: StatusState;
}): JSX.Element {
  const backgroundColor =
    state === "IN_REVIEW"
      ? "bg-yellow-100"
      : state === "APPROVED"
      ? "bg-green-100"
      : "bg-red-100";
  const textColor =
    state === "IN_REVIEW"
      ? "text-yellow-700"
      : state === "APPROVED"
      ? "text-green-700"
      : "text-red-700";
  return (
    <div className={`rounded ${backgroundColor} ${textColor} text-center p-1`}>
      {state}
    </div>
  );
}

import { Expense } from "../util/types";
import Button from "./common/Button";
import Highlight from "./common/Highlight";
import Table from "./common/Table";

const TABLE_HEADERS = [
  "Merchant",
  "Purchase Date",
  "Amount",
  "Description",
  "Status",
  "Reviewed By",
  "Review Date",
  "Comment",
  "",
];

export default function ExpenseTable({
  expenses,
  onRowButtonClick,
}: {
  expenses: Expense[];
  onRowButtonClick: (index: number) => void;
}): JSX.Element {
  return (
    <Table>
      <Table.Headers headers={TABLE_HEADERS} />
      <Table.Body>
        {expenses.map((expense, index) => {
          return (
            <Table.Row key={`table-row-${index}`}>
              <Table.Data>{expense.merchant}</Table.Data>
              <Table.Data>{expense.purchase_date}</Table.Data>
              <Table.Data extraClassNames="text-right">
                ${Number(expense.amount).toFixed(2)}
              </Table.Data>
              <Table.Data>{expense.description}</Table.Data>
              <Table.Data>
                <Highlight state={expense.status.state} />
              </Table.Data>
              <Table.Data>{expense.status.reviewed_by}</Table.Data>
              <Table.Data>{expense.status.review_date}</Table.Data>
              <Table.Data>{expense.status.comment}</Table.Data>
              <Table.Data extraClassNames="w-1">
                <Button.TrashIcon
                  extraClassNames={
                    expense.status.state === "IN_REVIEW" ? "" : "hidden"
                  }
                  onClick={() => onRowButtonClick(index)}
                />
              </Table.Data>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

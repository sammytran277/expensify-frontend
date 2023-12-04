import { Expense } from "../util/types";
import Button from "./common/Button";
import Table from "./common/Table";

const TABLE_HEADERS = [
  "Employee ID",
  "Employee Username",
  "Merchant",
  "Purchase Date",
  "Amount",
  "Description",
  "",
];

export default function ReviewExpenseTable({
  expenses,
  onRowButtonClick,
}: {
  expenses: Expense[];
  onRowButtonClick: (expenseId: number) => void;
}): JSX.Element {
  return (
    <Table>
      <Table.Headers headers={TABLE_HEADERS} />
      <Table.Body>
        {expenses.map((expense: Expense, index: number): JSX.Element => {
          return (
            <Table.Row key={`table-row-${index}`}>
              <Table.Data>{expense.employee_id}</Table.Data>
              <Table.Data>{expense.employee_username}</Table.Data>
              <Table.Data>{expense.merchant}</Table.Data>
              <Table.Data>{expense.purchase_date}</Table.Data>
              <Table.Data extraClassNames="text-right">
                ${Number(expense.amount).toFixed(2)}
              </Table.Data>
              <Table.Data>{expense.description}</Table.Data>
              <Table.Data extraClassNames="w-1">
                <Button.Blue
                  type="button"
                  onClick={() => onRowButtonClick(expense.id)}
                >
                  Review
                </Button.Blue>
              </Table.Data>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

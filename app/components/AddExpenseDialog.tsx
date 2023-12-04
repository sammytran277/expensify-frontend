import { FormEvent } from "react";
import CenteredDialog from "./common/CenteredDialog";
import Form from "./common/Form";
import Button from "./common/Button";

export default function AddExpenseDialog({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}): JSX.Element {
  return (
    <CenteredDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={onSubmit} extraClassNames="mb-6">
        <div className="mb-4">
          <Form.Label htmlFor="merchant">Merchant</Form.Label>
          <Form.Input type="text" id="merchant" placeholder="Merchant" />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="purchase_date">Purchase Date</Form.Label>
          <Form.Input type="date" id="purchase_date" />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="amount">Amount</Form.Label>
          <Form.Input
            type="number"
            id="amount"
            step={0.01}
            placeholder="Amount"
          />
        </div>
        <div className="mb-6">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Input type="text" id="description" placeholder="Description" />
        </div>
        <div className="w-max ml-auto">
          <Button.White type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </Button.White>
          <Button.Blue type="submit" extraClassNames="ml-4">
            Submit
          </Button.Blue>
        </div>
      </Form>
    </CenteredDialog>
  );
}

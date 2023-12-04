import { FormEvent } from "react";
import { useUserContext } from "../context/user";
import { User } from "../util/types";
import CenteredDialog from "./common/CenteredDialog";
import Form from "./common/Form";
import Button from "./common/Button";

export default function ReviewExpenseDialog({
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}): JSX.Element {
  const user = useUserContext()?.user as User;
  return (
    <CenteredDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={onSubmit} extraClassNames="mb-6">
        <div className="mb-4">
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Select id="state" options={["Approved", "Rejected"]} />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="reviewed_by">Reviewed By</Form.Label>
          <Form.Input
            type="text"
            id="reviewed_by"
            placeholder="foo"
            value={user.username}
            isReadOnly={true}
          />
        </div>
        <div className="mb-4">
          <Form.Label htmlFor="review_date">Date</Form.Label>
          <Form.Input
            type="date"
            id="review_date"
            placeholder="bar"
            value={new Date().toISOString().slice(0, 10)}
            isReadOnly={true}
          />
        </div>
        <div className="mb-6">
          <Form.Label htmlFor="comment">Comment</Form.Label>
          <Form.TextArea id="comment" placeholder="Comment" />
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

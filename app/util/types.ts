import { Dispatch, SetStateAction } from "react";

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Role = "ROLE_EMPLOYEE" | "ROLE_REVIEWER";

export type User = {
  id: number;
  username: string;
  role: Role;
};

export type StatusState = "IN_REVIEW" | "APPROVED" | "REJECTED";

export type Status = {
  state: StatusState;
  reviewed_by: Nullable<string>;
  review_date: Nullable<string>;
  comment: Nullable<string>;
};

export type Expense = {
  id: number;
  merchant: string;
  purchase_date: string;
  amount: number;
  description: string;
  status: {
    state: StatusState;
    reviewed_by: Nullable<string>;
    review_date: Nullable<string>;
    comment: Nullable<string>;
  };
  employee_id?: number;
  employee_username?: string;
};

export type Employee = {
  id: number;
  username: string;
  role: Role;
  expenses: Expense[];
};

export type UserContextType = {
  user: Nullable<User>;
  setUser: Dispatch<SetStateAction<Nullable<User>>>;
};

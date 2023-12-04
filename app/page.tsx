"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "./context/user";
import { Expense, User } from "./util/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { api } from "./util/api";
import Navbar from "./components/common/Navbar";
import Button from "./components/common/Button";
import SearchBox from "./components/common/SearchBox";
import AddExpenseDialog from "./components/AddExpenseDialog";
import ExpenseTable from "./components/ExpenseTable";
import ReviewExpenseDialog from "./components/ReviewExpenseDialog";
import ReviewExpenseTable from "./components/ReviewExpenseTable";

export default function Home() {
  const router = useRouter();
  const user = useUserContext()?.user as User;  
  const [expensesToDisplay, setExpensesToDiplay] = useState<Expense[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [idOfExpenseToReview, setIdOfExpenseToReview] = useState<number>(0);


  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user?.role === "ROLE_EMPLOYEE") {
      api.getExpensesByEmployeeId(
        user.id,
        (data: Expense[]): void => setExpensesToDiplay(data),
        (error: Error): void => console.error(error)
      );
    } else {
      api.getExpensesToReview(
        (data: Expense[]): void => setExpensesToDiplay(data),
        (error: Error): void => console.error(error)
      );
    }
  }, []);

  const handleAddExpense = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    api.addExpense(
      user.id,
      {
        merchant: target.merchant.value as string,
        purchase_date: target.purchase_date.value as string,
        amount: Number(target.amount.value),
        description: target.description.value as string,
      },
      (data: Expense): void => {
        setExpensesToDiplay([...expensesToDisplay, data]);
        setIsDialogOpen(false);
      },
      (error: Error): void => console.error(error)
    );
  };

  const handleLogOut = () => {
    api.logout(
      (): void => router.push("/login"),
      (error: Error): void => console.error(error)
    );
  };

  const handleDeleteExpense = (index: number): void => {
    const expenseToDelete = expensesToDisplay[index];
    api.deleteExpense(
      user.id,
      expenseToDelete.id,
      (): void => {
        expensesToDisplay.splice(index, 1);
        setExpensesToDiplay([...expensesToDisplay]);
      },
      (error: Error): void => console.error(error)
    );
  };

  const handleReviewExpense = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    api.reviewExpense(
      idOfExpenseToReview,
      {
        state: target.state.value,
        reviewed_by: target.reviewed_by.value as string,
        review_date: target.review_date.value as string,
        comment: target.comment.value as string,
      },
      (): void => {
        setExpensesToDiplay(
          expensesToDisplay.filter((expense: Expense): boolean => {
            return expense.id !== idOfExpenseToReview;
          })
        );
        setIsDialogOpen(false);
      },
      (error: Error): void => console.error(error)
    );
  };

  if (user === null) {
    return <p>Redirecting...</p>;
  } else if (user.role === "ROLE_EMPLOYEE") {
    return (
      <>
        <Navbar>
          <Navbar.Brand>My Expenses</Navbar.Brand>
          <div className="ml-auto">
            <Button.Blue
              onClick={() => setIsDialogOpen(true)}
              extraClassNames="mr-4"
            >
              Add New Expense
            </Button.Blue>
            <Button.White onClick={handleLogOut}>Log out</Button.White>
          </div>
        </Navbar>
        <div className="flex flex-col justify-center mx-32 my-10">
          <div className="ml-auto my-5">
            <SearchBox
              onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                setSearchText(event.target.value);
              }}
              placeholder="Search by merchant"
            />
          </div>
          <AddExpenseDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onSubmit={handleAddExpense}
          />
          <ExpenseTable
            expenses={expensesToDisplay.filter((expense: Expense): boolean => {
              return expense.merchant
                .toLowerCase()
                .startsWith(searchText.toLowerCase());
            })}
            onRowButtonClick={handleDeleteExpense}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar>
        <Navbar.Brand>Expenses to Review</Navbar.Brand>
        <div className="ml-auto">
          <Button.White onClick={handleLogOut}>Log out</Button.White>
        </div>
      </Navbar>
      <div className="flex flex-col justify-center mx-32 my-10">
        <div className="ml-auto my-5">
          <SearchBox
            onChange={(event: ChangeEvent<HTMLInputElement>): void => {
              setSearchText(event.target.value);
            }}
            placeholder="Search by merchant"
          />
        </div>
        <ReviewExpenseDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          onSubmit={handleReviewExpense}
        />
        <ReviewExpenseTable
          expenses={expensesToDisplay.filter((expense: Expense): boolean => {
            return expense.merchant
              .toLowerCase()
              .startsWith(searchText.toLowerCase());
          })}
          onRowButtonClick={(expenseId: number): void => {
            setIdOfExpenseToReview(expenseId);
            setIsDialogOpen(true);
          }}
        />
      </div>
    </>
  );
}

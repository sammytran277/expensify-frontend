"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "./context/user";
import { Expense, User } from "./util/types";
import { useEffect, useState } from "react";
import { api } from "./util/api";

export default function Home() {
  const router = useRouter();
  const user = useUserContext()?.user as User;  
  const [expensesToDisplay, setExpensesToDiplay] = useState<Expense[]>([]);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user?.role === "EMPLOYEE") {
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

  if (user === null) {
    return <p>Redirecting...</p>;
  } else if (user.role === "EMPLOYEE") {
    return <p>Hello, employee!</p>;
  }
  return <p>Hello, reviewer!</p>;
}

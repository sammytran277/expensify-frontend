import { Employee, Expense, Status, User } from "./types";

class Api {
  private baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public login(
    username: string,
    password: string,
    onSuccess: (data: User) => void,
    onFailure: (error: Error) => void
  ): void {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    fetch(`${this.baseUrl}/login`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response: Response): Promise<User> => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data: User): void => onSuccess(data))
      .catch((error: Error): void => onFailure(error));
  }

  public logout(
    onSuccess: () => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then((response: Response): void => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          onSuccess();
        }
      })
      .catch((error: Error): void => onFailure(error));
  }

  public getExpensesByEmployeeId(
    employeeId: number,
    onSuccess: (data: Expense[]) => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/employees/${employeeId}/expenses`, {
      method: "GET",
      credentials: "include",
    })
      .then((response: Response): Promise<Expense[]> => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data: Expense[]): void => onSuccess(data))
      .catch((error: Error): void => onFailure(error));
  }

  public addExpense(
    employeeId: number,
    body: {
      merchant: string;
      purchase_date: string;
      amount: number;
      description: string;
    },
    onSuccess: (data: Expense) => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/employees/${employeeId}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response: Response): Promise<Expense> => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data: Expense): void => onSuccess(data))
      .catch((error: Error): void => onFailure(error));
  }

  public deleteExpense(
    employeeId: number,
    expenseId: number,
    onSuccess: () => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/employees/${employeeId}/expenses/${expenseId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response: Response): void => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          onSuccess();
        }
      })
      .catch((error: Error): void => onFailure(error));
  }

  public getExpensesToReview(
    onSuccess: (data: Expense[]) => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/employees`, {
      method: "GET",
      credentials: "include",
    })
      .then((response: Response): Promise<Employee[]> => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data: Employee[]): void => {
        const expensesToReview = data
          .map((employee: Employee): Expense[] => {
            return employee.expenses
              .filter((expense: Expense): boolean => {
                return expense.status.state === "IN_REVIEW";
              })
              .map((expense: Expense): Expense => {
                return {
                  ...expense,
                  employee_id: employee.id,
                  employee_username: employee.username,
                };
              });
          })
          .flat(1);
        onSuccess(expensesToReview);
      })
      .catch((error: Error): void => onFailure(error));
  }

  public reviewExpense(
    expenseId: number,
    body: Status,
    onSuccess: () => void,
    onFailure: (error: Error) => void
  ): void {
    fetch(`${this.baseUrl}/expenses/${expenseId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response: Response): void => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          onSuccess();
        }
      })
      .catch((error: Error): void => onFailure(error));
  }
}

export const api = new Api("http://localhost:8080");

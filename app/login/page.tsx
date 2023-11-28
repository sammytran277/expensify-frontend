"use client";

import { useRouter } from "next/navigation";
import { useUserContext } from "../context/user";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Nullable, User } from "../util/types";
import { api } from "../util/api";
import Form from "../components/common/Form";
import Button from "../components/common/Button";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const setUser = useUserContext()?.setUser as Dispatch<
    SetStateAction<Nullable<User>>
  >;
  const [isCorrectCredentials, setIsCorrectCredentials] = useState(true);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    api.login(
      target.username.value as string,
      target.password.value as string,
      (data: User): void => {
        setIsCorrectCredentials(true);
        setUser(data);
        router.push("/");
      },
      (_: Error): void => setIsCorrectCredentials(false)
    );
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Form
        onSubmit={handleLogin}
        extraClassNames="bg-white flex flex-col rounded shadow-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Input
            type="text"
            id="username"
            placeholder="Username"
            extraClassNames={`${isCorrectCredentials ? "" : "border-red-500"}`}
          />
        </div>
        <div className="mb-6">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Input
            type="password"
            id="password"
            placeholder="****************"
            extraClassNames={`${isCorrectCredentials ? "" : "border-red-500"}`}
          />
          <p
            className={`${
              isCorrectCredentials
                ? "hidden"
                : "mt-2 text-red-500 text-xs italic"
            }`}
          >
            The username or password you entered is incorrect.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button.Blue type="submit" extraClassNames="ml-auto">
            Log in
          </Button.Blue>
        </div>
      </Form>
    </div>
  );
}

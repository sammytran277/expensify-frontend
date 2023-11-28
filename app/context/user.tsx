"use client";

import { createContext, useContext, useState } from "react";
import { Nullable, User, UserContextType } from "../util/types";

const UserContext = createContext<Nullable<UserContextType>>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<Nullable<User>>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): Nullable<UserContextType> => {
  return useContext(UserContext);
};

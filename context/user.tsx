import { User } from "firebase/auth";
import React, { createContext, useState } from "react";
import { useUser } from "../hooks/user";

interface Props {
  children: React.ReactNode;
}

interface ContextType {
  user: User | null;
  currentUserIndex: Number;
  setCurrentUserIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = createContext({} as ContextType);

export default function UserStateProvider({ children }: Props) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const user = useUser();

  return (
    <UserContext.Provider
      value={{
        user,
        currentUserIndex,
        setCurrentUserIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

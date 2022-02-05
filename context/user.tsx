import { User } from "firebase/auth";
import React, { createContext, useState } from "react";
import { useFirebaseUser } from "../hooks/user";

interface Props {
  children: React.ReactNode;
}

export interface UserContextType {
  user: User | null;
  currentUserIndex: number;
  setCurrentUserIndex: React.Dispatch<React.SetStateAction<number>>;
}

// NOTE: createContextの引数は適当でいい
export const UserContext = createContext({} as UserContextType);

export default function UserStateProvider({ children }: Props) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const user = useFirebaseUser();
  console.log("exec provider", user);

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

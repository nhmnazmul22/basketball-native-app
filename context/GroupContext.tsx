import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  groupId: string;
  setGroupId: React.Dispatch<React.SetStateAction<string>>;
}

const GroupContext = createContext<AuthContextType | undefined>(undefined);

const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [groupId, setGroupId] = useState("");


  return (
    <GroupContext.Provider value={{ groupId: groupId, setGroupId: setGroupId}}>
      {children}
    </GroupContext.Provider>
  );
};

export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error("useGroup must be used within an AuthProvider");
  }
  return context;
}

export default GroupProvider;

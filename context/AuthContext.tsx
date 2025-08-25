import { decodeToken, getData } from "@/lib/utils";
import { AppDispatch } from "@/store";
import { fetchUser } from "@/store/userByIdSlice";
import { Session } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

interface AuthContextType {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const checkAuth = async () => {
    try {
      const session = await getData();
      if (session && session.token) {
        const data = decodeToken(session.token);
        setSession(data);
        dispatch(fetchUser());
      }
    } catch (err: any) {
      console.log(err);
      setSession(null);
      Toast.show({
        type: "error",
        text1: "Authentication Failed",
        text2: err.message && err.message,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ session: session, setSession: setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;

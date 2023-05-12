import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getRequestUrl } from "../utils";

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);

  const signin = async (users: any, callback: VoidFunction) => {
    const res = await fetch(getRequestUrl(`/api/auth/signin`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...users,
      }),
    }).then((res) => res.json());

    if (res?.token) {
      setUser(res);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res,
          expire: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 days
        })
      );
      return callback();
    }
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.clear();
    return callback();
  };

  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = React.useContext(AuthContext);
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "src/types/payload-types";

type Login = (args: { email: string; password: string }) => Promise<void>;

type AuthContext = {
  user?: User | null;
  login: Login;
  logout: () => void;
  isLoading: boolean;
};

type UseAuth = () => AuthContext;

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const login: Login = async (args) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/users/login`,
        {
          method: "POST",
          body: JSON.stringify(args),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setUser(json.user);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/users/me`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setUser(result.user);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Context.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth: UseAuth = () => useContext(Context);

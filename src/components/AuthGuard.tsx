import { useRouter } from "next/router";
import { type } from "os";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "src/providers/AuthProvider";

type AuthGuardProps = React.PropsWithChildren<{
  redirectUrl?: string;
}>;

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return children;
};

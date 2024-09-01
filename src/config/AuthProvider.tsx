"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default AuthProvider;

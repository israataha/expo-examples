import React from "react";
import { useStorageState } from "./useStorageState";
import Auth0 from "react-native-auth0";
import { Auth0ErrorDetails } from "./types";

export const auth0 = new Auth0({
  domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "",
  clientId: process.env.EXPO_PUBLIC_AUTH0_CLIENTID || "",
});

const AuthContext = React.createContext<{
  logIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  logIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const logIn = async (email: string, password: string) => {
    try {
      const credentials = await auth0.auth.passwordRealm({
        username: email,
        password: password,
        realm: "Username-Password-Authentication",
        scope: "openid profile",
      });
      setSession("xxx");
    } catch (e) {
      const error = e as Auth0ErrorDetails;
      throw error.message ?? e;
    }
  };

  const signOut = async () => {
    try {
      setSession(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn: async (email, password) => {
          await logIn(email, password);
        },
        signOut: () => {
          signOut();
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

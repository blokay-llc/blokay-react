import { createContext, useEffect } from "react";
import useSession from "../hooks/useSession";

const contextDefaultValue: any = {
  session: null,
  setSession: () => {},
};
const Context = createContext(contextDefaultValue);

type BlokayProviderProps = {
  children: any;
  businessId?: string;
  jwtToken?: string;
};
const BlokayProvider = ({
  children,
  businessId = "",
  jwtToken = "",
}: BlokayProviderProps) => {
  const { session, setSession, setJWT } = useSession();

  useEffect(() => {
    if (jwtToken) {
      setJWT(jwtToken);
    }
  }, []);

  return (
    <Context.Provider value={{ businessId, session, setSession }}>
      {children}
    </Context.Provider>
  );
};

export { Context, BlokayProvider };

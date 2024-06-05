import { createContext, useEffect } from "react";
import useSession from "../hooks/useSession";
import useApi from "../hooks/useApi";

const contextDefaultValue: any = {
  session: null,
  setSession: () => {},
};
const Context = createContext(contextDefaultValue);

type BlokayProviderProps = {
  children: any;
  businessId?: string;
  jwtToken?: string;
  endpoint?: string;
};
const BlokayProvider = ({
  children,
  businessId = "",
  jwtToken = "",
  endpoint = "https://app.blokay.com/api/",
}: BlokayProviderProps) => {
  const { session, setSession, setJWT } = useSession();
  const api = useApi({ jwtToken, endpoint });

  useEffect(() => {
    if (jwtToken) {
      setJWT(jwtToken);
    }
  }, [jwtToken]);

  return (
    <Context.Provider value={{ businessId, session, setSession, api }}>
      {children}
    </Context.Provider>
  );
};

export { Context, BlokayProvider };

import { createContext, useEffect } from "react";
import useSession from "../hooks/useSession";
import useApi from "../hooks/useApi";

const contextDefaultValue: any = {
  session: null,
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
  const session = useSession();
  const api = useApi(endpoint, session);

  useEffect(() => {
    if (jwtToken) {
      session.setJWT(jwtToken);
    }
  }, [jwtToken]);

  return (
    <Context.Provider
      value={{
        businessId,
        session: session.session,
        setJWT: session.setJWT,
        api,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, BlokayProvider };

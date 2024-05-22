import { createContext } from "react";
import useSession from "../hooks/useSession";
// Crear el contexto
const contextDefaultValue: any = {
  session: null,
  setSession: () => {},
};
const Context = createContext(contextDefaultValue);

const BlokayProvider = ({ children, businessId }: any) => {
  const { session, setSession } = useSession();

  return (
    <Context.Provider value={{ businessId, session, setSession }}>
      {children}
    </Context.Provider>
  );
};

export { Context, BlokayProvider };

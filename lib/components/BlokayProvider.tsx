import { createContext, useState } from "react";

// Crear el contexto
const contextDefaultValue: any = {
  session: null,
  setSession: () => {},
};
const Context = createContext(contextDefaultValue);

const BlokayProvider = ({ children, businessId }: any) => {
  const [session, setSession] = useState(null);

  return (
    <Context.Provider value={{ businessId, session, setSession }}>
      {children}
    </Context.Provider>
  );
};

export { Context, BlokayProvider };

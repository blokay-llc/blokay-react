import { createContext, useState } from "react";

const contextDefaultValue: any = {
  webComponent: null,
};
const ContextRoot = createContext(contextDefaultValue);

type BlokayProviderProps = {
  children: any;
  webComponent: any;
  defaultForm: any;
};

const BlokayRoot = ({
  children,
  webComponent,
  defaultForm,
}: BlokayProviderProps) => {
  const [exception, setException]: any = useState(null);
  return (
    <ContextRoot.Provider
      value={{
        webComponent,
        setException,
        defaultForm,
      }}
    >
      {exception && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 rounded-lg mb-3">
          {exception.message}
        </div>
      )}
      {children}
    </ContextRoot.Provider>
  );
};

export { ContextRoot, BlokayRoot };

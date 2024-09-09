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
        <div className="bl-bg-red-100 dark:bl-bg-red-900 bl-text-red-800 dark:bl-text-red-200 bl-p-3 bl-rounded-lg bl-mb-3">
          {exception.message}
        </div>
      )}
      {children}
    </ContextRoot.Provider>
  );
};

export { ContextRoot, BlokayRoot };

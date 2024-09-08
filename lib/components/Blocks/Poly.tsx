import { useEffect, useState } from "react";

export default function Poly({ resource = "" }) {
  const [webComponent, setWebComponent] = useState("");

  useEffect(() => {
    setWebComponent("table-component");
  }, [resource]);

  const getComponentName = () => {
    const suffix = (window as any)._blokayInstance.getSuffix();
    const prefix = (window as any)._blokayInstance.getSuffix();
    if (suffix) {
      return `${webComponent}-${suffix}`;
    }
    if (prefix) {
      return `${prefix}-${webComponent}`;
    }
    return webComponent;
  };

  if (!webComponent) {
    return null;
  }

  return (
    <div
      className={`dark:border-white/10 border-neutral-300 border rounded-xl  overflow-y-auto max-h-full h-full p-5 bg-neutral-100 dark:bg-transparent `}
      dangerouslySetInnerHTML={{
        __html: `<${getComponentName()} resource="${resource}" className="w-full h-full"  />`,
      }}
    />
  );
}

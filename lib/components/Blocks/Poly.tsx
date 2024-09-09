import { useEffect, useState, useRef } from "react";

export default function Poly({
  resource = "",
  defaultForm = {},
  onExecuted = null,
}: any) {
  const [webComponent, setWebComponent] = useState("");

  const ref = useRef<any>(null);

  const waitLoadComponent = async () => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    let retries = 100;
    let canSet: any = null;

    while (retries > 0) {
      canSet = ref.current?.setDefaultForm;
      if (canSet) {
        return true;
      }

      await sleep(30);
      retries--;
    }

    throw new Error("setDefaultForm not found");
  };

  const loaded = () => {
    ref.current.setDefaultForm(defaultForm);
    ref.current.addEventListener("blokay:executed", () => {
      onExecuted && onExecuted();
    });
  };

  useEffect(() => {
    (async () => {
      setWebComponent("table-component");
      await waitLoadComponent();
      loaded();
    })();
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

  const Component: any = getComponentName();

  return <Component ref={ref} resource={resource} defaultform={defaultForm} />;
}

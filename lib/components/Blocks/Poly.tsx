import { useEffect, useState, useRef } from "react";

export default function Poly({
  resource = "",
  defaultForm = {},
  onExecuted = null,
}: any) {
  const [webComponent, setWebComponent] = useState({
    key: "",
    urlStyles: "",
  });

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
    ref.current.addEventListener("blokay:executed", (event: any) => {
      onExecuted && onExecuted(event);
    });
  };

  useEffect(() => {
    (async () => {
      if (!resource) return;
      setWebComponent({
        key: "table-component",
        urlStyles: "https://static.blokay.com/bl/5439d989ab4b.css",
      });
      await waitLoadComponent();
      loaded();
    })();
  }, [resource]);

  const getComponentName = () => {
    const suffix = (window as any)._blokayInstance.getSuffix();
    const prefix = (window as any)._blokayInstance.getSuffix();
    const component = webComponent.key;
    if (suffix) {
      return `${component}-${suffix}`;
    }
    if (prefix) {
      return `${prefix}-${component}`;
    }
    return component;
  };

  if (!webComponent?.key) {
    return null;
  }

  const Component: any = getComponentName();

  return (
    <Component
      ref={ref}
      prevent-auto-render={true}
      resource={resource}
      defaultform={defaultForm}
      linkstyles={webComponent.urlStyles}
    />
  );
}

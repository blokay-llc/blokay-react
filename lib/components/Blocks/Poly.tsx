import { useEffect, useState, useRef } from "react";
import useSession from "../../hooks/useSession";
import useApi from "../../hooks/useApi";

export default function Poly({
  resource = "",
  defaultForm = {},
  onExecuted = null,
}: any) {
  const jwt = (window as any).BLOKAY_JWT;
  const session = useSession(jwt);
  const api = useApi("https://app.blokay.com/api/", session);

  const [webComponent, setWebComponent] = useState({
    webComponent: "",
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
    const get = async () => {
      if (!resource) return;
      const req: any = {
        blockKey: resource,
      };
      const result = await api.blockGet(req, jwt);
      setWebComponent(result.Block.Component);
    };

    get();
  }, [resource]);

  useEffect(() => {
    (async () => {
      if (!webComponent?.webComponent) return;
      await waitLoadComponent();
      loaded();
    })();
  }, [webComponent]);

  const getComponentName = () => {
    const suffix = (window as any)._blokayInstance.getSuffix();
    const prefix = (window as any)._blokayInstance.getSuffix();
    const component = webComponent.webComponent;
    if (suffix) {
      return `${component}-${suffix}`;
    }
    if (prefix) {
      return `${prefix}-${component}`;
    }
    return component;
  };

  if (!webComponent?.webComponent) {
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

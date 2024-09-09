import { useState, useEffect, useContext } from "react";
import { BlockType } from "../types/Block";
import useSession from "./useSession";
import useApi from "./useApi";
import { ContextRoot } from "../providers/BlokayRoot";

const saveData = (data: any, fileName: string) => {
  const a: any = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  const url = window.URL.createObjectURL(data);

  a.href = url;
  a.download = fileName;
  a.target = "_blank";
  a.click();
  window.URL.revokeObjectURL(url);
};

const useResource = (resource: string) => {
  const jwt = (window as any).BLOKAY_JWT;
  const session = useSession(jwt);
  const api = useApi("https://app.blokay.com/api/", session);
  const { webComponent, setException, defaultForm } = useContext(ContextRoot);

  const [block, setBlock] = useState<BlockType | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const get = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const req: any = {
        blockKey: resource,
      };
      const result = await api.blockGet(req, jwt);
      const bl: BlockType = result.Block;
      setBlock(bl);

      const autoExec = !bl.filters?.fields?.length;

      if (autoExec) {
        return await execute({});
      }
    } catch (error) {
      console.log(error);
      setException(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const execute = async (form: any = {}) => {
    try {
      setException(null);
      setLoading(true);
      const req = {
        blockKey: resource,
        form: {
          ...(defaultForm || {}),
          ...form,
        },
      };
      setForm(form);
      const result = await api.blockExec(req, jwt);
      if (result.response?.type === "exception") {
        throw result.response?.content;
      }
      setResponse(result.response);

      if (webComponent) {
        webComponent.dispatch("blokay:executed", result);
      }
      return result;
    } catch (error) {
      setException(error);
    } finally {
      setLoading(false);
    }
  };

  const reload = async () => {
    return await execute(form);
  };

  const clearResponse = () => {
    setResponse(null);
  };

  const onExport = async (form: any) => {
    if (!block) return;
    setLoading(true);

    try {
      const data = {
        blockId: block.id,
        form: {
          ...(defaultForm || {}),
          ...form,
        },
      };
      const result = await api.blockExecExcel(data, jwt || "");
      saveData(result, `${block.description}.xlsx`);
    } catch (error) {
      setException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    reload,
    execute,
    response,
    block,
    get,
    clearResponse,
    onExport,
    loading,
  };
};

export default useResource;

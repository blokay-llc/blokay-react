import { postRequest, postMultimedia } from "../services/_base";

type sessionProps = {
  logout: () => void;
  getJwtToken: () => string | null;
};

export default function useApi(endpoint: string, session: sessionProps) {
  const blockGet = async function ({ neuronId = null, neuronKey = null }) {
    const data = {
      neuronId,
      neuronKey,
    };

    try {
      const result = await postRequest(
        endpoint + "brain/get",
        data,
        session.getJwtToken()
      );
      return result.data;
    } catch (error: any) {
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const blockExec = async function (form: any) {
    const data = {
      ...form,
    };

    try {
      const result = await postRequest(
        endpoint + "brain/exec",
        data,
        session.getJwtToken()
      );
      return result.data;
    } catch (error: any) {
      if (error?.error == "Unauthorized") {
        session.logout();
      }
    }
  };

  const createSession = async function (form: any) {
    const data = {
      ...form,
    };

    const result = await postRequest(
      endpoint + "brain/createSession",
      data,
      null
    );
    return result.data;
  };

  const sendFile = async function (path: string, formData: any) {
    return await postMultimedia(endpoint + path, formData, {});
  };

  return { blockGet, blockExec, sendFile, createSession };
}

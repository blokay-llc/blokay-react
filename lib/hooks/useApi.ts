import { postRequest, postMultimedia } from "../services/_base";

type useApiProps = {
  jwtToken?: string;
  endpoint?: string;
};
export default function useApi(props: useApiProps) {
  const brainGet = async function ({ neuronId = null, neuronKey = null }) {
    const data = {
      neuronId,
      neuronKey,
    };

    const result = await postRequest(
      props.endpoint + "brain/get",
      data,
      props.jwtToken
    );
    return result.data;
  };

  const brainExec = async function (form: any) {
    const data = {
      ...form,
    };

    const result = await postRequest(
      props.endpoint + "brain/exec",
      data,
      props.jwtToken
    );
    return result.data;
  };

  const sendFile = async function (path: string, formData: any) {
    return await postMultimedia(props.endpoint + path, formData, {});
  };

  return { brainGet, brainExec, sendFile };
}

import { postRequest } from "../services/_base";

type useApiProps = {
  jwtToken?: string;
  endpoint?: string;
};
export default function useApi(props: useApiProps) {
  const { jwtToken = "", endpoint } = props;

  const brainGet = async function ({ neuronId = null, neuronKey = null }) {
    const data = {
      neuronId,
      neuronKey,
    };

    const result = await postRequest(endpoint + "brain/get", data, jwtToken);
    return result.data;
  };

  const brainExec = async function (form: any) {
    const data = {
      ...form,
    };

    const result = await postRequest(endpoint + "brain/exec", data, jwtToken);
    return result.data;
  };

  return { brainGet, brainExec };
}

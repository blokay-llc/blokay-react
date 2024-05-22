import { postRequest } from "./_base";

export const brainGet = async function (
  { neuronId = null, neuronKey = null },
  jwtToken: string
) {
  const data = {
    neuronId,
    neuronKey,
  };

  const result = await postRequest("brain/get", data, jwtToken);

  return result.data;
};

export const brainExec = async function (form: any, jwtToken: string) {
  const data = {
    ...form,
  };

  const result = await postRequest("brain/exec", data, jwtToken);

  return result.data;
};

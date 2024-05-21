import { postRequest } from "./_base";

export const brainGet = async function ({ neuronId = null, neuronKey = null }) {
  const data = {
    neuronId,
    neuronKey,
  };

  const result = await postRequest("brain/get", data);

  return result.data;
};

export const brainExec = async function (form: any) {
  const data = {
    ...form,
  };

  const result = await postRequest("brain/exec", data);

  return result.data;
};

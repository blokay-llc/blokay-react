import { postRequest } from "../services/_base";

export default async function createSession(businessId: any, data: any) {
  const result = await postRequest("brain/createSession", {
    ...data,
    businessId,
  });

  const { jwtToken, content } = result.data;
  localStorage.setItem("jwt_token_session", jwtToken);

  return content;
}

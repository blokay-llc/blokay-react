import { useContext } from "react";
import { Context } from "../BlokayProvider";
import { postRequest } from "../../services/_base";

async function createSession(businessId: any, data: any) {
  const result = await postRequest("brain/createSession", {
    ...data,
    businessId,
  });

  const { jwtToken, content } = result.data;
  localStorage.setItem("jwt_token_session", jwtToken);

  return content;
}

export default function SignForm({ children, form, className }: any) {
  const { setSession, businessId } = useContext(Context);
  const submit = async (event: any) => {
    event.preventDefault();

    const data = await createSession(businessId, form);
    setSession(data);
  };

  return (
    <form onSubmit={submit} className={className}>
      {children}
    </form>
  );
}

import { useContext } from "react";
import { Context } from "../BlokayProvider";

export default function SignOut({ children }: any) {
  const { session } = useContext(Context);

  if (session) {
    return;
  }
  return <div>{children}</div>;
}

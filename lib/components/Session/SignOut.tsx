import { useContext } from "react";
import { Context } from "../BlokayProvider";

type SignOutProps = {
  children?: any;
};
export default function SignOut({ children }: SignOutProps) {
  const { session } = useContext(Context);

  if (session) {
    return;
  }
  return <div>{children}</div>;
}

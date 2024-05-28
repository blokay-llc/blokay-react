import { useContext } from "react";
import { Context } from "../BlokayProvider";

type SignInProps = {
  children?: any;
};
export default function SignIn({ children }: SignInProps) {
  const { session } = useContext(Context);

  if (!session) {
    return;
  }
  return <div>{children}</div>;
}

import { useContext, useState } from "react";
import { Context } from "../BlokayProvider";
import * as DS from "../../components/DS/Index";

type SignFormProps = {
  children?: any;
  form?: any;
  className?: string;
};
export default function SignForm({
  children,
  form: formProp,
  className,
}: SignFormProps) {
  const { api } = useContext(Context);
  const [form, setForm] = useState({ username: "", password: "" });
  const { setJWT, businessId } = useContext(Context);

  const submit = async (event: any) => {
    event.preventDefault();
    const { jwtToken } = await api.createSession({
      businessId,
      ...form,
      ...formProp,
    });

    setJWT(jwtToken);
  };

  return (
    <form
      onSubmit={submit}
      className={
        className
          ? className
          : "bl-flex bl-flex-col bl-gap-5 bl-max-w-96 bl-px-10 bl-py-10 bl-rounded-xl bl-mx-auto bl-bg-white bl-border-2 bl-shadow-md "
      }
    >
      {children && children}
      {!children && (
        <>
          <div>
            <div className="bl-text-stone-600 bl-text-2xl bl-font-medium">
              Sign in
            </div>
            <div className="bl-text-stone-600 bl-font-light">
              Hello again!, login to access
            </div>
          </div>
          <DS.Input
            value={form.username}
            onChange={(val) => setForm({ ...form, username: val })}
            type="text"
            label="Username"
          />
          <DS.Input
            value={form.password}
            onChange={(val) => setForm({ ...form, password: val })}
            type="password"
            label="Password"
          />

          <DS.Button
            variant="primary"
            type="submit"
            text="Sign in"
            size="lg"
            className="w-full"
          />
        </>
      )}
    </form>
  );
}

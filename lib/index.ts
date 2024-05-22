import "./index.css";

import * as DS from "./components/DS/Index";
import { BlokayProvider, Context } from "./components/BlokayProvider";
import SignIn from "./components/Session/SignIn";
import SignOut from "./components/Session/SignOut";
import SignForm from "./components/Session/SignForm";
import useSession from "./hooks/useSession";
import logout from "./helpers/logout";
import Block from "./components/Brain/Block";
import BlockResponse from "./components/Brain/BlockResponse";
import Events from "./components/Brain/Events";

const setJWT = (token: string) => {
  localStorage.setItem("jwt_token_session", token);
};

export {
  DS,
  SignIn,
  SignOut,
  SignForm,
  BlokayProvider,
  Context,
  // session
  setJWT,
  useSession,
  logout,

  //  blocks
  Events,
  Block,
  BlockResponse,
};

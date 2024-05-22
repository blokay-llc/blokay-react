import "./index.css";

import * as DS from "./components/DS/Index";
import useSession from "./hooks/useSession";
import createSession from "./helpers/createSession";
import logout from "./helpers/logout";
import Block from "./components/Brain/Block";
import BlockResponse from "./components/Brain/BlockResponse";
import Events from "./components/Brain/Events";

const setJWT = (token: string) => {
  localStorage.setItem("jwt_token_session", token);
};

export {
  DS,
  // session
  setJWT,
  createSession,
  useSession,
  logout,

  //  blocks
  Events,
  Block,
  BlockResponse,
};

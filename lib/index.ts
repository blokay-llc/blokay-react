import "./index.css";

import useSession from "./hooks/useSession";
import Neuron from "./components/Brain/Neuron";
import NeuronResponse from "./components/Brain/NeuronResponse";
import Events from "./components/Brain/Events";
import * as DS from "./components/DS/Index";

const setJWT = (token: string) => {
  localStorage.setItem("jwt_token_session", token);
};
const createSession = (data: any) => {
  console.log(data);
};
const logout = () => {};

export {
  DS,
  // session
  setJWT,
  createSession,
  useSession,
  logout,

  //  blocks
  Events,
  Neuron,
  NeuronResponse,
};

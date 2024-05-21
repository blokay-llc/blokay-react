import "./index.css";

import useSession from "./hooks/useSession";
import Neuron from "./components/Brain/Neuron";
import NeuronResponse from "./components/Brain/NeuronResponse";
import Events from "./components/Brain/Events";
import * as DS from "./components/DS/Index";

const session = {
  setJWT(token: string) {
    localStorage.setItem("jwt_token_session", token);
  },
  createSession(data: any) {
    console.log(data);
  },
  useSession,
  logout() {},
};

const blocks = {
  Events,
  Neuron,
  NeuronResponse,
  Block: Neuron,
};

export default { ...session, ...blocks, DS };

import { useEffect, useState } from "react";
import { decodeJWT } from "../helpers/jwt";

export default function useSession() {
  const [session, setSession] = useState<any>(null);

  const key = "jwt_token_session";
  const getSession = () => {
    const token = localStorage.getItem(key);
    if (token) {
      const decoded = decodeJWT(token);
      setSession(decoded);
    }
  };

  const setJWT = (token: string) => {
    localStorage.setItem(key, token);
    const decoded = decodeJWT(token);
    setSession(decoded);
  };

  const logout = () => {
    localStorage.removeItem(key);
    setSession(null);
  };

  useEffect(() => {
    getSession();
  }, []);

  return { session, setSession, setJWT, logout };
}

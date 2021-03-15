import { createContext } from "react";
import Auth from "../../users/pages/Auth";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

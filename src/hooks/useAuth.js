import { use } from "react";
import AuthContext from "../providers/AuthContext";

// this is a custom hook, used for call the auth context
const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;

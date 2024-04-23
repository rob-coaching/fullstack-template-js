import { useCallback, useState } from "react";
import { Context } from "./useStore";
import { loginApi, signupApi } from "../utils/axiosCalls";
import { useNavigate } from "react-router-dom";
import { clearUserInLs, setUserInLs } from "./localStorage";

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate()

  // set error for failed API calls
  const setApiError = useCallback((err) => {
    const errMsg = err.response?.data.error || "API fall failed";
    console.log("[API ERROR]", errMsg);
    setError(errMsg);
  }, [setError]);

  const signup = async (userData) => {
    await signupApi(userData)
      .then((res) => {
        console.log("[SIGNUP]", res.data);
        navigate("/login");
      })
      .catch(setApiError);
  };

  const login = async (userData) => {
    return loginApi(userData.email, userData.password)
      .then((res) => {
        const user = res.data
        console.log("[LOGIN]", user);
        setUser(user);
        setUserInLs(user)
        setError("");
        navigate("/profile");
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  const logout = () => {
    setUser();
    clearUserInLs()
  };

  const sharedData = { user, setUser, login, logout, signup, error, setError };

  return <Context.Provider value={sharedData}>{children}</Context.Provider>;
};

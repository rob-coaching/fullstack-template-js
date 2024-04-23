import { useCallback, useEffect, useState } from "react";
import { Context } from "./useStore";
import { authCheckApi, loginApi, setToken, signupApi } from "../utils/axiosCalls";
import { useNavigate } from "react-router-dom";
import { clearUserInLs, loadUserFromLs, setUserInLs } from "./localStorage";

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromLs());
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // on startup: if token is available => check if still valid
  useEffect(() => {
    if (!user) return;

    // check found user token against API...
    setToken(user.token)
    authCheckApi()
    .catch((err) => {
      setApiError(err)
      logout()
    })
  }, []);

  // set error for failed API calls
  const setApiError = useCallback(
    (err) => {
      const errMsg = err.response?.data.error || "API fall failed";
      console.log("[API ERROR]", errMsg);
      setError(errMsg);
    },
    [setError]
  );

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
        const user = res.data;
        console.log("[LOGIN]", user);
        setUser(user);
        setUserInLs(user);
        setError("");
        navigate("/profile");
      })
      .catch((err) => {
        setApiError(err);
      });
  };

  const logout = () => {
    setUser();
    clearUserInLs();
  };

  const sharedData = { user, setUser, login, logout, signup, error, setError };

  return <Context.Provider value={sharedData}>{children}</Context.Provider>;
};

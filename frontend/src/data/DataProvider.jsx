import { useState } from "react"
import { Context } from "./useStore"
import { loginApi } from "../utils/axiosCalls"


export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: ""
  })
  const login = async (user) => {
    return loginApi(user.email, user.password)
    .then(res => {
      setUser(res.data)
      localStorage.setItem("APP_USER", JSON.stringify("USER"))
    })
    .catch(err => {
      console.log("[AUTH ERROR]", err.response?.data.error)
      logout()
    })
  }

  const logout = () => {
    setUser()
    localStorage.removeItem("APP_USER")
  }

  const sharedData = { user, setUser, login, logout };

  return <Context.Provider value={sharedData}>{children}</Context.Provider>
}


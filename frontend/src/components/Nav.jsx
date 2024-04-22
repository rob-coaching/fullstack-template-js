import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../data/useStore";

export const Nav = () => {

  const navigate = useNavigate()
  const { logout: logoutApi } = useStore()

  const logout = (e) => {
    e.preventDefault()
    logoutApi()
    navigate("/")
  }

  return (
    <nav>
      <NavLink to="/">🏠 Home</NavLink>
      <NavLink to="/login">➡️ Login</NavLink>
      <NavLink to="/signup">↪️ Signup</NavLink>
      <NavLink onClick={logout} to="#">↪️ Logout</NavLink>
    </nav>
  );
};

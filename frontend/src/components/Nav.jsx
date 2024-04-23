import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../data/useStore";

export const Nav = () => {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/">🏠 Home</NavLink>
      {user ? (
        <>
          <NavLink to="/profile">🌞 Profile</NavLink>
          <NavLink to="/logout" onClick={onLogout}>
            ↪️ Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">➡️ Login</NavLink>
          <NavLink to="/signup">↪️ Signup</NavLink>
        </>
      )}
    </nav>
  );
};

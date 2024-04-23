import { useStore } from "../data/useStore";

export const LoginPage = () => {
  const { login } = useStore();

  const onLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // extract formData into object
    const loginData = Object.fromEntries(formData.entries());
    login(loginData);
  };

  return (
    <>
      <form onSubmit={onLogin}>
        <input name="email" type="email" placeholder="Email..." />
        <input name="password" type="password" placeholder="Password..." />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

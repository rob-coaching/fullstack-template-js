import { useStore } from "../data/useStore";

export const SignupPage = () => {
  const { signup } = useStore();

  const onSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // extract formData into object
    const signupData = Object.fromEntries(formData.entries());
    signup(signupData);
  };

  return (
    <>
      <form onSubmit={onSignup}>
        <input name="email" type="email" placeholder="Email..." />
        <input name="password" type="password" placeholder="Password..." />
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

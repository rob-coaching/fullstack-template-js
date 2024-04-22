import { createContext, useContext } from "react";

export const Context = createContext();

// custom hook to easily grab data from context
export const useStore = () => {
  return useContext(Context);
};

import { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const [trigger, setTrigger] = useState(0);

  const updateTrigger = () => setTrigger((prev) => prev + 1);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  }

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  }

  const value = {
    token,
    saveToken,
    removeToken,
    trigger,
    updateTrigger
  }

  return (
    <AppContext.Provider
      value={value}
    >
      {props.children}
    </AppContext.Provider>
  );
};

import { useContext, createContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const [trigger, setTrigger] = useState(0);

  const updateTrigger = () => setTrigger((prev) => prev + 1);

  return (
    <AppContext.Provider
      value={{ trigger: trigger, updateTrigger: updateTrigger }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

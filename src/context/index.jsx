import { createContext, useContext, useEffect, useReducer, useState } from "react";

const AsterContext = createContext();
AsterContext.displayName = "AsterContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "SET_DARK_MODE": {
      return { ...state, darkMode: action.value };
    }
    case "ADMIN_DASHBOARD_GET_LOADED":
      return { ...state, loadedDashboardGet: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AsterControllerProvider = ({ children }) => {
  const initialState = {
    miniSidenav: false,
    darkMode: false,
    loadedDashboardGet: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  return <AsterContext.Provider value={[controller, dispatch]}>{children}</AsterContext.Provider>;
};

const useAsterController = () => {
  const context = useContext(AsterContext);

  if (!context) {
    throw new Error('[useAsterController should be used inside the AsterControllerProvider.]');
  }

  return context;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export { AsterControllerProvider, useAsterController, useWindowSize };
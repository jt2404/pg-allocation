import { useReducer, createContext, useContext } from "react";

const initialState = {
  pgList: [],
  isPgLoading :false
};

const reducer = (state, { action, payload }) => {
  switch (action) {
    case "UPDATE_PG_LIST":
      return { ...state, pgList: payload };
    case "ADD_PG":
      return { ...state, pgList: { ...state.pgList, payload } };
    case "UPDATE_PG_LOADER":
      return { ...state,isPgLoading:payload  };
    default:
      return state;
  }
};

const storeContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    updatePgList: (pgs) => dispatch({ action: "UPDATE_PG_LIST", payload: pgs }),
    addPg: (pg) => dispatch({ action: "ADD_PG", payload: pg }),
    updatePgLoader: (state) =>
      dispatch({ action: "UPDATE_PG_LOADER", payload: state }),
  };

  return (
    <storeContext.Provider
      value={{
        state: state,
        methods: actions,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

const useStore = () => useContext(storeContext);

export { StoreProvider, storeContext, useStore };

import React from "react";

export const CTX = React.createContext();

/**
 * shape of message:
 * from: string
 * msg: string
 * topic: string
 *
 * shape of state:
 * topic: array of messages
 */
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      };

    default: {
      return state;
    }
  }
};

const initialState = {
  general: [
    { from: "Blake", msg: "Hello!" },
    { from: "Juan", msg: "Hola!" },
    { from: "Carlo", msg: "Yo!" },
  ],
  bikes: [
    { from: "Blake", msg: "Bikes are cool!" },
    { from: "Juan", msg: "Si!" },
    { from: "Carlo", msg: "Yo!" },
  ],
};

const Store = props => {
  const reducerHook = React.useReducer(reducer, initialState);

  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
};

export default Store;

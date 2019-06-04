import React from "react";
import io from "socket.io-client";

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

let socket;
function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  // connect socket.io
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", msg => {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  // create random username
  const user = "user" + Math.floor(Math.random() * 1000);
  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;

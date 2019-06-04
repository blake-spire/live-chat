import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Store from "./Store";

const App = props => {
  return (
    <main className="App">
      <Store>
        <Dashboard />
      </Store>
    </main>
  );
};

export default App;

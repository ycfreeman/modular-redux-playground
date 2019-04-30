import React from "react";
import "./App.css";

import { useSelector, useActions } from "react-redux";
import {
  increment as _incrementAC,
  decrement as _decrementAC,
  asyncIncrement as _asyncIncrementAC,
  getCounter
} from "@/modules/counter";

const App = () => {
  const { decrement, asyncIncrement } = useActions({
    increment: () => _incrementAC(),
    decrement: () => _decrementAC(),
    asyncIncrement: () => _asyncIncrementAC()
  });

  const counter = useSelector(getCounter);

  return (
    <div className="App">
      <header className="App-header">
        <p>{counter}</p>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => asyncIncrement()}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => decrement()}
          >
            -
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;

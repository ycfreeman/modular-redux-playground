import React from "react";
import { useSelector, useActions } from "react-redux";
import {
  increment as _incrementAC,
  decrement as _decrementAC,
  asyncIncrement as _asyncIncrementAC,
  getCounter
} from "./widget";
import { Button } from "reactstrap";

const Counter = () => {
  const { decrement, asyncIncrement } = useActions({
    increment: () => _incrementAC(),
    decrement: () => _decrementAC(),
    asyncIncrement: () => _asyncIncrementAC()
  });

  const counter = useSelector(getCounter);

  return (
    <>
      <p>{counter}</p>
      <div>
        <Button color="primary" outline={true} onClick={() => asyncIncrement()}>
          +
        </Button>
        <Button color="primary" outline={true} onClick={() => decrement()}>
          -
        </Button>
      </div>
    </>
  );
};

export default Counter;

import React from "react";
import { useSelector, useActions } from "react-redux";
import {
  increment as _incrementAC,
  decrement as _decrementAC,
  asyncIncrement as _asyncIncrementAC,
  getCounter
} from "./widget";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

const Counter = () => {
  const { decrement, asyncIncrement } = useActions({
    increment: () => _incrementAC(),
    decrement: () => _decrementAC(),
    asyncIncrement: () => _asyncIncrementAC()
  });

  const counter = useSelector(getCounter);

  return (
    <Card>
      <CardContent>{counter}</CardContent>
      <CardActions>
        <IconButton onClick={() => asyncIncrement()}>
          <PlusIcon />
        </IconButton>
        <IconButton onClick={() => decrement()}>
          <MinusIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Counter;

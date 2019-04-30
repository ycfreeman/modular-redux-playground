import { createAction, handleActions, Action } from "redux-actions";
import { createSelector } from "reselect";

import { installReducer } from "@/core/store";

interface StateShape {
  counter: number;
}

export const DOMAIN = "counter";
const initalState: StateShape = {
  counter: 0
};

// actions
export const asyncIncrement = () => async (dispatch: any) => {
  return dispatch(increment());
};
export const increment = createAction(`${DOMAIN}/increment`);
export const decrement = createAction(`${DOMAIN}/decrement`);
export const setCounter = createAction(
  `${DOMAIN}/setCounter`,
  (v: number) => v
);

// reducers
const reducer = handleActions(
  {
    [increment.toString()](s) {
      return {
        counter: s.counter += 1
      };
    },
    [decrement.toString()](s) {
      return {
        counter: s.counter -= 1
      };
    },
    [setCounter.toString()](s, a: Action<number>) {
      return {
        counter: a.payload
      };
    }
  },
  initalState
);

installReducer(DOMAIN, reducer);

// selectors
const getScopedState = (s: any) => s[DOMAIN] as StateShape;

export const getCounter = createSelector(
  [getScopedState],
  s => {
    return s.counter;
  }
);

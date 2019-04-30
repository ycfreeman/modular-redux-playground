import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { createStore } from "redux";
import { Provider } from "react-redux";

it("renders without crashing", () => {
  const store = createStore(s => s, { counter: { counter: 0 } });

  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

import React, { lazy, Suspense } from "react";
import "./App.css";
import AppNav from "./AppNav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Jumbotron, Card } from "reactstrap";

const Counter = lazy(() => import("@/modules/counter/Counter"));

const App = () => {
  return (
    <BrowserRouter>
      <AppNav />
      <Switch>
        <Route exact={true} path="/">
          <Jumbotron>
            <h1>Homepage</h1>
          </Jumbotron>
        </Route>
        <Route path="/counter">
          <Card>
            <Suspense fallback={null}>
              <Counter />
            </Suspense>
          </Card>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

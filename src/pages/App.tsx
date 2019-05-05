import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import Navigation from "./Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation>{renderRoutes(routes)}</Navigation>
    </BrowserRouter>
  );
};

export default App;

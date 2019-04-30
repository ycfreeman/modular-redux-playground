import React, { lazy, Suspense } from "react";
import "./App.css";

const Counter = lazy(() => import("@/modules/counter/Counter"));

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback={null}>
          <Counter />
        </Suspense>
      </header>
    </div>
  );
};

export default App;

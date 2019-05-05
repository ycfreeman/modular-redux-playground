import React, { lazy, Suspense } from "react";

import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";

import Home from "./Home";

const Counter = lazy(() => import("@/modules/counter/Counter"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    title: "Homepage",
    Icon: HomeIcon
  },
  {
    path: "/counter",
    component: () => (
      <Suspense fallback={null}>
        <Counter />
      </Suspense>
    ),
    title: "Counter",
    Icon: CreateIcon
  }
];

export default routes;

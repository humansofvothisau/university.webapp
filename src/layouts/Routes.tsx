import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
// import Error404 from "../components/Error/404";
// import Home from "../components/Home";
// import Thpt from "../components/THPT";
// import University from "../components/University";
// import Benchmark from "../components/University/Benchmark";
const Error404 = lazy(() => import("../components/Error/404"));
const Home = lazy(() => import("../components/Home"));
const Thpt = lazy(() => import("../components/THPT"));
const University = lazy(() => import("../components/University"));
const Benchmark = lazy(() => import("../components/University/Benchmark"));

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/university">
        <University />
      </Route>
      <Route path="/university/:uniCode">
        <Benchmark />
      </Route>
      <Route exact path="/tot-nghiep-thpt">
        <Thpt />
      </Route>
      <Route>
        <Error404 />
      </Route>
    </Switch>
  );
};

export default Routes;

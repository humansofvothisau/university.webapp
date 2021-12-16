import React from "react";
import { Route, Switch } from "react-router-dom";

export default (
  <Switch>
    <Route exact path="/" />
    <Route exact path="/university" />
    <Route path="/university/:uniCode" />
    <Route exact path="/tot-nghiep-thpt" />
  </Switch>
);

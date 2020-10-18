import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import BoardApplication from "./components";
import * as routeConstants from "./constants/routeConstants";

function App() {
  return (
    <Switch>
      <Route
        exact={true}
        path={routeConstants.defaultRoute}
        component={BoardApplication}
      />
      <Route
        path={routeConstants.createHistoryRoute}
        component={() => <span>Hello</span>}
      />
    </Switch>
  );
}

export default App;

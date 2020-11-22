import React from "react";
import { Route, Switch } from "react-router-dom";
import * as routeConstants from "../../constants/routeConstants";
import BoardApplication from "../index";
import StartScreenContainer from "../login-registration/StartScreenContainer";
import UndefinedPage from "../no-match/UndefinedPage";
import StoryFullViewContainer from "../story-full-view/StoryFullViewContainer";

const CustomRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={routeConstants.DefaultRoute}
        component={BoardApplication}
      />
      <Route
        path={routeConstants.CreateOrViewStoryRoute}
        component={StoryFullViewContainer}
      />
      <Route
        path={routeConstants.LoginScreenRoute}
        component={StartScreenContainer}
      />
      <Route
        path={routeConstants.RegistrationScreenRoute}
        component={StartScreenContainer}
      />
      <Route path={routeConstants.NoMatchRoute} component={UndefinedPage} />
    </Switch>
  );
};

export default CustomRouter;

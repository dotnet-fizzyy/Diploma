import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import GeneralTabContainer from '../header/general-tab/GeneralTabContainer';
import BoardApplication from '../index';
import StartScreenContainer from '../login-registration/StartScreenContainer';
import UndefinedPage from '../no-match/UndefinedPage';
import StoryFullViewContainer from '../story-full-view/StoryFullViewContainer';
import StoryHistoryContainer from '../story-history/StoryHistoryContainer';
import RouteGuard from './RouteGuard';

export interface ICustomRouterProps {
    isLogged: boolean;
}

const CustomRouter = (props: ICustomRouterProps) => {
    const { isLogged } = props;

    return (
        <div>
            <GeneralTabContainer />
            <Switch>
                <Route path={routeConstants.LoginScreenRoute} component={StartScreenContainer} />
                <Route path={routeConstants.RegistrationScreenRoute} component={StartScreenContainer} />

                <RouteGuard
                    exact={true}
                    path={routeConstants.DefaultRoute}
                    component={BoardApplication}
                    isLogged={isLogged}
                />
                <RouteGuard
                    path={routeConstants.FullViewStoryRoute}
                    component={StoryFullViewContainer}
                    isLogged={isLogged}
                />
                <RouteGuard
                    path={routeConstants.ViewStoryHistoryRoute}
                    component={StoryHistoryContainer}
                    isLogged={isLogged}
                />
                <RouteGuard path={routeConstants.NoMatchRoute} component={UndefinedPage} isLogged={isLogged} />
            </Switch>
        </div>
    );
};

export default CustomRouter;

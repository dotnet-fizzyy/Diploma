import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import Footer from '../footer/Footer';
import GeneralTabContainer from '../header/general-tab/GeneralTabContainer';
import BoardApplication from '../index';
import StartScreenContainer from '../login-registration/StartScreenContainer';
import MainPageContainer from '../main/MainPageContainer';
import ProjectManagementContainer from '../management/project/ProjectManagementContainer';
import ProjectViewerContainer from '../management/project/ProjectViewerContainer';
import TeamManagementContainer from '../management/team/TeamManagementContainer';
import TeamsViewerContainer from '../management/team/TeamsViewerContainer';
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
        <>
            {isLogged && <GeneralTabContainer />}
            <Switch>
                <Route path={routeConstants.LoginScreenRoute} component={StartScreenContainer} />
                <Route path={routeConstants.RegistrationScreenRoute} component={StartScreenContainer} />
                <RouteGuard
                    exact={true}
                    path={routeConstants.DefaultRoute}
                    component={BoardApplication}
                    isLogged={isLogged}
                />
                <RouteGuard path={routeConstants.TestDefaultRoute} component={MainPageContainer} isLogged={isLogged} />
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
                <RouteGuard
                    path={routeConstants.TeamsViewerRoute}
                    component={TeamsViewerContainer}
                    isLogged={isLogged}
                />
                <RouteGuard
                    path={routeConstants.ProjectsViewerRoute}
                    component={ProjectViewerContainer}
                    isLogged={isLogged}
                />
                <RouteGuard
                    path={routeConstants.TeamManagementRoute}
                    component={TeamManagementContainer}
                    isLogged={isLogged}
                />
                <RouteGuard
                    path={routeConstants.ProjectManagementRoute}
                    component={ProjectManagementContainer}
                    isLogged={isLogged}
                />
                <Route path={routeConstants.NoMatchRoute} component={UndefinedPage} />
            </Switch>
            {isLogged && <Footer />}
        </>
    );
};

export default CustomRouter;

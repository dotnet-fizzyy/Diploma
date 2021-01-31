import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import { IUser } from '../../types/userTypes';
import { UserRouteGuard } from '../../utils/routeHelper';
import ChartsContainer from '../charts/ChartsContainer';
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
    user: IUser;
}

const CustomRouter = (props: ICustomRouterProps) => {
    const { user } = props;
    const isUserAuthenticated: boolean = new UserRouteGuard(user).validate();

    return (
        <>
            {isUserAuthenticated && <GeneralTabContainer />}
            <Switch>
                <Route path={routeConstants.LoginScreenRoute} component={StartScreenContainer} />
                <Route path={routeConstants.RegistrationScreenRoute} component={StartScreenContainer} />
                <RouteGuard
                    path={routeConstants.ProjectBoardRoute}
                    component={BoardApplication}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    exact={true}
                    path={routeConstants.DefaultRoute}
                    component={MainPageContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.FullViewStoryRoute}
                    component={StoryFullViewContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.ViewStoryHistoryRoute}
                    component={StoryHistoryContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.TeamsViewerRoute}
                    component={TeamsViewerContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.ProjectsViewerRoute}
                    component={ProjectViewerContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.TeamManagementRoute}
                    component={TeamManagementContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.ProjectManagementRoute}
                    component={ProjectManagementContainer}
                    isValid={isUserAuthenticated}
                />
                <RouteGuard
                    path={routeConstants.EpicChartsRoute}
                    component={ChartsContainer}
                    isValid={isUserAuthenticated}
                />
                <Route path={routeConstants.NoMatchRoute} component={UndefinedPage} />
            </Switch>
            {isUserAuthenticated && <Footer />}
        </>
    );
};

export default CustomRouter;

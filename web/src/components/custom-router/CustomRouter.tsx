import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import StartScreenContainer from '../../pages/authentication/StartScreenContainer';
import { IUser } from '../../types/userTypes';
import { UserRouteGuard } from '../../utils/routeHelper';
import { ApplicationRouting } from './ApplicationRouting';
import LoadingScreen from './LoadingScreen';
import RouteGuard from './RouteGuard';

export interface ICustomRouterProps {
    user: IUser;
    isLoading: boolean;
}

const CustomRouter = (props: ICustomRouterProps) => {
    const { user, isLoading } = props;
    const isAuthenticated: boolean = new UserRouteGuard(user).validate();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Switch>
            {ApplicationRouting.map((route) => (
                <RouteGuard
                    exact={route.exact}
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isAuthenticated={isAuthenticated}
                />
            ))}
            {!isAuthenticated && <Route path={routeConstants.LoginScreenRoute} component={StartScreenContainer} />}
            {!isAuthenticated && (
                <Route path={routeConstants.RegistrationScreenRoute} component={StartScreenContainer} />
            )}
        </Switch>
    );
};

export default CustomRouter;

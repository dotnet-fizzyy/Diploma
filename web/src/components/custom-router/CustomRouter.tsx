import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginScreenRoute, RegistrationScreenRoute } from '../../constants/routeConstants';
import StartScreenContainer from '../../pages/authentication/StartScreenContainer';
import { IUser } from '../../types/userTypes';
import { UserRouteGuard } from '../../utils/routeUtils';
import { ApplicationRouting } from './ApplicationRouting';
import RouteGuard from './RouteGuard';

export interface ICustomRouterProps {
    user: IUser;
    isLoading: boolean;
}

const CustomRouter = (props: ICustomRouterProps) => {
    const { user, isLoading } = props;
    const isAuthenticated: boolean = new UserRouteGuard(user).validate();

    return (
        <Switch>
            {!isAuthenticated && <Route path={LoginScreenRoute} component={StartScreenContainer} />}
            {!isAuthenticated && <Route path={RegistrationScreenRoute} component={StartScreenContainer} />}
            {ApplicationRouting.map((route) => (
                <RouteGuard
                    isCustomer={route.isCustomer}
                    user={user}
                    exact={route.exact}
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isAuthenticated={isAuthenticated}
                    isLoading={isLoading}
                />
            ))}
        </Switch>
    );
};

export default CustomRouter;

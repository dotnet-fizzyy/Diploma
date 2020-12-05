import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';

const RouteGuard = ({ component: Component, isLogged, ...rest }) => {
    return (
        <Route
            {...rest}
            path={rest.path}
            render={(props) =>
                isLogged ? <Component {...props} /> : <Redirect to={routeConstants.LoginScreenRoute} />
            }
        />
    );
};

export default React.memo(RouteGuard);

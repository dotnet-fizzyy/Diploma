import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginScreenRoute } from '../../constants/routeConstants';
import ApplicationPageContainer from './ApplicationPageContainer';
import LoadingScreen from './LoadingScreen';

const RouteGuard = ({ component: Component, exact, isAuthenticated, isLoading, ...rest }) => {
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Route
            {...rest}
            exact={exact}
            path={rest.path}
            render={(props) =>
                isAuthenticated ? (
                    <ApplicationPageContainer>
                        <Component {...props} />
                    </ApplicationPageContainer>
                ) : (
                    <Redirect to={LoginScreenRoute} />
                )
            }
        />
    );
};

export default React.memo(RouteGuard);

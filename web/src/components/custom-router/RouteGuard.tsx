import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginScreenRoute } from '../../constants/routeConstants';
import { isUserCustomer } from '../../utils';
import UndefinedPage from '../no-match/UndefinedPage';
import ApplicationPageContainer from './ApplicationPageContainer';
import LoadingScreen from './LoadingScreen';

const RouteGuard = ({ component: Component, exact, user, isAuthenticated, isLoading, isCustomer, ...rest }) => {
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
                        {isCustomer && user && !isUserCustomer(user.userRole, user.userPosition) ? (
                            <UndefinedPage />
                        ) : (
                            <Component {...props} />
                        )}
                    </ApplicationPageContainer>
                ) : (
                    <Redirect to={LoginScreenRoute} />
                )
            }
        />
    );
};

export default React.memo(RouteGuard);

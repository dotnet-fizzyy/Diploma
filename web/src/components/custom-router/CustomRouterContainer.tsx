import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultRoute, LoginScreenRoute } from '../../constants/routeConstants';
import * as currentUserActions from '../../redux/actions/userActions';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import { IUser } from '../../types/userTypes';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [initialPath, setInitialPath] = useState<string>('');
    const user: IUser = useSelector(currentUserSelectors.getUser);
    const isLoading: boolean = useSelector(currentUserSelectors.getIsUserLoading);

    useEffect(() => {
        if (!(user && user.userId)) {
            dispatch(currentUserActions.verifyUserRequest());
        }
    }, [dispatch, user]);

    useEffect(() => {
        setInitialPath(location.pathname);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (initialPath && user && user.userId) {
            const isLoginPage: boolean = initialPath === LoginScreenRoute;

            history.push(isLoginPage ? DefaultRoute : initialPath);
        }
    }, [initialPath, user, history]);

    const customRouterProps: ICustomRouterProps = {
        user,
        isLoading,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

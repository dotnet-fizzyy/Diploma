import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DefaultRoute, LoginScreenRoute } from '../../constants/routeConstants';
import { verifyUserRequest } from '../../redux/actions/userActions';
import { getIsUserLoading, getUser } from '../../redux/selectors/userSelectors';
import { IUser } from '../../types/userTypes';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [initialPath, setInitialPath] = useState<string>('');
    const user: IUser = useSelector(getUser);
    const isLoading: boolean = useSelector(getIsUserLoading);

    useEffect(() => {
        if (!(user && user.userId)) {
            dispatch(verifyUserRequest());
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setInitialPath(location.pathname.concat(location.search));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (initialPath && user && user.userId) {
            const isLoginPage: boolean = initialPath.split('?')[0] === LoginScreenRoute;

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

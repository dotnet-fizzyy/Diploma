import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserRequest } from '../../redux/actions/userActions';
import { getRouterFullPath } from '../../redux/selectors/routeSelectors';
import { getIsUserLoading, getUser } from '../../redux/selectors/userSelectors';
import { IUser } from '../../types/userTypes';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();
    const route = useSelector(getRouterFullPath);

    const user: IUser = useSelector(getUser);
    const isLoading: boolean = useSelector(getIsUserLoading);

    useEffect(() => {
        if (!(user && user.userId)) {
            dispatch(verifyUserRequest(route));
        }
        // eslint-disable-next-line
    }, []);

    const customRouterProps: ICustomRouterProps = {
        user,
        isLoading,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserRequest } from '../../redux/actions/user';
import { getRouterFullPath } from '../../redux/selectors/route';
import { getIsUserLoading, getUser } from '../../redux/selectors/user';
import { IUser } from '../../types/user';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();

    const route = useSelector(getRouterFullPath);
    const user: IUser = useSelector(getUser);
    const isLoading: boolean = useSelector(getIsUserLoading);

    useEffect(() => {
        if (!user?.userId) {
            dispatch(verifyUserRequest(route));
        }
    }, []);

    const customRouterProps: ICustomRouterProps = {
        user,
        isLoading,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserRequest } from '../../redux/actions/user';
import { getRouterFullPath } from '../../redux/selectors/route';
import { getIsUserLoading, getUser } from '../../redux/selectors/user';
import { IUser } from '../../types/user';
import { isEmpty } from '../../utils';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();

    const route = useSelector(getRouterFullPath);
    const user: IUser = useSelector(getUser);
    const isLoading: boolean = useSelector(getIsUserLoading);

    useEffect(() => {
        if (isEmpty(user?.userId)) {
            dispatch(verifyUserRequest(route));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const customRouterProps: ICustomRouterProps = {
        user,
        isLoading,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

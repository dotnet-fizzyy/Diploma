import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(currentUserSelectors.getUser);
    const isLogged = !!(user && user.userId);

    useEffect(() => {
        if (!isLogged) {
            dispatch(currentUserActions.verifyUserRequest());
        }
    }, [dispatch, isLogged]);

    const customRouterProps: ICustomRouterProps = {
        isLogged,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [defaultPath, setDefaultPath] = useState<string>('');
    const user = useSelector(currentUserSelectors.getUser);

    useEffect(() => {
        if (!(user && user.userId)) {
            dispatch(currentUserActions.verifyUserRequest());
        }
    }, [dispatch, user]);

    useEffect(() => {
        setDefaultPath(location.pathname);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (defaultPath && user && user.userId) {
            history.push(defaultPath);
        }
    }, [defaultPath, user, history]);

    const customRouterProps: ICustomRouterProps = {
        user,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

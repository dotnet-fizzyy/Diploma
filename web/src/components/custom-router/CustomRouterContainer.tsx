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

    const [initialPath, setInitialPath] = useState<string>('');
    const user = useSelector(currentUserSelectors.getUser);

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
            history.push(initialPath);
        }
    }, [initialPath, user, history]);

    const customRouterProps: ICustomRouterProps = {
        user,
    };

    return <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { ICustomRouterProps } from './components/custom-router/CustomRouter';
import CustomRouter from './components/custom-router/CustomRouter';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ModalWindowContainer from './components/modal/ModalWindowContainer';
import { verifyUserRequest } from './redux/actions/user';
import { getRouterFullPath } from './redux/selectors/route';
import { getIsUserLoading, getUser } from './redux/selectors/user';
import { IUser } from './types/user';
import { isEmpty } from './utils';

const App = () => {
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

    return (
        <ErrorBoundary>
            <CustomRouter {...customRouterProps} />

            <ModalWindowContainer />
        </ErrorBoundary>
    );
};

export default App;

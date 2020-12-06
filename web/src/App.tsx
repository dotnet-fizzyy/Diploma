import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import CustomRouter from './components/custom-router/CustomRouterContainer';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ModalWindowContainer from './components/modal/ModalWindowContainer';
import * as currentUserActions from './redux/actions/currentUserActions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentUserActions.verifyUser());
    }, [dispatch]);

    return (
        <ErrorBoundary>
            <CustomRouter />
            <ModalWindowContainer />
        </ErrorBoundary>
    );
}

export default App;

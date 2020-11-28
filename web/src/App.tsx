import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import CustomRouter from './components/custom-router/CustomRouterContainer';
import * as currentUserActions from './redux/actions/currentUserActions';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentUserActions.verifyUser());
    }, [dispatch]);

    return <CustomRouter />;
}

export default App;

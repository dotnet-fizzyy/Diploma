import React from 'react';
import './App.css';
import CustomRouter from './components/custom-router/CustomRouterContainer';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import ModalWindowContainer from './components/modal/ModalWindowContainer';

function App() {
    return (
        <ErrorBoundary>
            <CustomRouter />
            <ModalWindowContainer />
        </ErrorBoundary>
    );
}

export default App;

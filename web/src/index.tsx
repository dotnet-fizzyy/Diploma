import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { getPersistStore } from './redux/store/store';

const persistStore = getPersistStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={persistStore.store}>
            <PersistGate loading={null} persistor={persistStore.persist}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { getStore } from './redux/store/store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={getStore()}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

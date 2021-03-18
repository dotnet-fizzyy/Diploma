import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { getStore } from './redux/store/store';

ReactDOM.render(
    <Provider store={getStore()}>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

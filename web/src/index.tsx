import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { getStore, history } from './redux/store/store';

ReactDOM.render(
    <Provider store={getStore()}>
        <ConnectedRouter history={history}>
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <App />
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

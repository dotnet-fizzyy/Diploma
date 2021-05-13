import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import epicReducer from '../reducers/epicsReducer';
import modalReducer from '../reducers/modalReducer';
import projectsReducer from '../reducers/projectReducer';
import sidebarReducer from '../reducers/sidebarReducer';
import sprintsReducer from '../reducers/sprintsReducer';
import storiesReducer from '../reducers/storiesReducer';
import teamsReducer from '../reducers/teamReducer';
import userReducer from '../reducers/userReducer';
import workSpaceReducer from '../reducers/workSpaceReducer';
import rootSaga from '../sagas';

export const history = createBrowserHistory();

const reducers = {
    currentUser: userReducer,
    project: projectsReducer,
    teams: teamsReducer,
    epics: epicReducer,
    sprints: sprintsReducer,
    stories: storiesReducer,
    sidebar: sidebarReducer,
    modal: modalReducer,
    workspace: workSpaceReducer,
    router: connectRouter(history),
};

const rootReducer = combineReducers({
    ...reducers,
});

let store = null;

export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware, routerMiddleware(history), logger];
    const enhancers = [applyMiddleware(...middlewares)];

    store = createStore(rootReducer, composeWithDevTools(...enhancers));

    sagaMiddleware.run(rootSaga);

    return store;
};

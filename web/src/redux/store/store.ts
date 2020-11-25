import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import currentUserReducer from '../reducers/currentUserReducer';
import projectsReducer from '../reducers/projectReducer';
import requestProcessorReducer from '../reducers/requestProcessorReducer';
import sidebarReducer from '../reducers/sidebarReducer';
import sprintsReducer from '../reducers/sprintsReducer';
import storiesReducer from '../reducers/storiesReducer';
import teamsReducer from '../reducers/teamReducer';
import rootSaga from '../sagas';

const reducers = {
    currentUser: currentUserReducer,
    project: projectsReducer,
    stories: storiesReducer,
    sidebar: sidebarReducer,
    teams: teamsReducer,
    sprints: sprintsReducer,
    requestProcessor: requestProcessorReducer,
};

const rootReducer = combineReducers({
    ...reducers,
});

let store = null;

export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware, logger];
    const enhancers = [applyMiddleware(...middlewares)];
    store = createStore(rootReducer, composeWithDevTools(...enhancers));

    sagaMiddleware.run(rootSaga);

    return store;
};

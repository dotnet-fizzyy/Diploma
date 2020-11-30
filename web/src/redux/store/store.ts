import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import createSagaMiddleware from 'redux-saga';
import currentUserReducer from '../reducers/currentUserReducer';
import epicReducer from '../reducers/epicsReducer';
import modalReducer from '../reducers/modalReducer';
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
    teams: teamsReducer,
    epics: epicReducer,
    sprints: sprintsReducer,
    stories: storiesReducer,
    sidebar: sidebarReducer,
    modal: modalReducer,
    requestProcessor: requestProcessorReducer,
};

const rootReducer = combineReducers({
    ...reducers,
});

const persistConfig = {
    key: 'state',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = null;

export const getPersistStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware, logger];
    const enhancers = [applyMiddleware(...middlewares)];

    store = createStore(persistedReducer, composeWithDevTools(...enhancers));

    sagaMiddleware.run(rootSaga);

    const persist = persistStore(store);

    return { store, persist };
};

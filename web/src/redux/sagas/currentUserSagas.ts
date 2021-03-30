import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as usersApi from '../../api/currentUserApi';
import * as userApi from '../../api/currentUserApi';
import { AuthenticationResponse } from '../../types';
import { ITeam } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';
import { clearCredentialsFromLocalStorage, setCredentialsToLocalStorage } from '../../utils';
import * as currentUserActions from '../actions/currentUserActions';
import * as modalActions from '../actions/modalActions';
import * as requestProcessorActions from '../actions/requestProcessorActions';
import * as teamSelectors from '../selectors/teamSelectors';

function* authenticateUser(action: currentUserActions.IAuthenticationRequest) {
    try {
        const authResponse: AuthenticationResponse = yield call(usersApi.authenticate, action.payload);
        yield put(currentUserActions.authenticationSuccess(authResponse));
        yield put(requestProcessorActions.hideSpinner());

        setCredentialsToLocalStorage(authResponse.accessToken.value, authResponse.refreshToken.value);
    } catch (error) {
        yield put(currentUserActions.authenticationFailure(error));
        yield put(requestProcessorActions.hideSpinner());
    }
}

function* createCustomer(action: currentUserActions.IRegistrationRequest) {
    try {
        yield call(usersApi.createCustomer, action.payload);
        yield put(currentUserActions.registrationSuccess());
        yield put(requestProcessorActions.hideSpinner());
    } catch (error) {
        yield put(currentUserActions.registrationFailure(error));
        yield put(requestProcessorActions.hideSpinner());
    }
}

function* logOutUser(action: currentUserActions.ILogOutUser) {
    clearCredentialsFromLocalStorage();

    yield put(currentUserActions.addUser(null));
}

function* verifyUser(action: currentUserActions.IVerifyUserRequest) {
    try {
        const user: IUser = yield call(userApi.getUserByToken);

        yield put(currentUserActions.verifyUserSuccess(user));
    } catch (error) {
        yield put(currentUserActions.verifyUserFailure(error));
    }
}

function* createUser(action: currentUserActions.ICreateUserRequest) {
    try {
        const currentTeam: ITeam = yield select(teamSelectors.getCurrentTeam);
        action.payload.teamId = currentTeam.teamId;

        const createdUser: IUser = yield call(userApi.createUser, action.payload);

        yield put(currentUserActions.createUserSuccess(createdUser));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(currentUserActions.createUserFailure(error));
    }
}

export default function* rootCurrentUserSaga() {
    yield takeLatest(currentUserActions.CurrentUserActions.AUTHENTICATION_REQUEST, authenticateUser);
    yield takeLatest(currentUserActions.CurrentUserActions.REGISTRATION_REQUEST, createCustomer);
    yield takeLatest(currentUserActions.CurrentUserActions.LOGOUT_USER, logOutUser);
    yield takeLatest(currentUserActions.CurrentUserActions.VERIFY_USER_REQUEST, verifyUser);
    yield takeLatest(currentUserActions.CurrentUserActions.CREATE_USER_REQUEST, createUser);
}

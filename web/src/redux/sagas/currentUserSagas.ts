import { call, put, takeLatest } from 'redux-saga/effects';
import * as usersApi from '../../ajax/currentUserApi';
//import mockedUser from '../../mock/mockedUser';
import { AuthenticationResponse } from '../../types';
import * as currentUserActions from '../actions/currentUserActions';
import * as requestProcessorActions from '../actions/requestProcessorActions';

function* authenticateUser(action: currentUserActions.IAuthenticationRequest) {
    try {
        const authResponse: AuthenticationResponse = yield call(usersApi.authenticate, action.payload);
        yield put(currentUserActions.authenticationSuccess(authResponse));
        yield put(requestProcessorActions.hideSpinner());

        //Set tokens to locale storage
        localStorage.setItem('access_token', authResponse.accessToken.value);
        localStorage.setItem('refresh_token', authResponse.refreshToken.value);
    } catch (error) {
        yield put(currentUserActions.authenticationFailure(error));
    }
}

function* usersRegistration(action: currentUserActions.IRegistrationRequest) {
    try {
        yield call(usersApi.createUser, action.payload);
        yield put(currentUserActions.registrationSuccess());
        yield put(requestProcessorActions.hideSpinner());
    } catch (error) {
        yield put(currentUserActions.registrationFailure(error));
    }
}

function* logOutUser(action: currentUserActions.ILogOutUser) {
    yield console.log('log out');
}

function* verifyUser(action: currentUserActions.IVerifyUser) {
    //yield put(currentUserActions.addUser(mockedUser));
}

export default function* rootCurrentUserSaga() {
    yield takeLatest(currentUserActions.CurrentUserActions.AUTHENTICATION_REQUEST, authenticateUser);
    yield takeLatest(currentUserActions.CurrentUserActions.REGISTRATION_REQUEST, usersRegistration);
    yield takeLatest(currentUserActions.CurrentUserActions.LOGOUT_USER, logOutUser);
    yield takeLatest(currentUserActions.CurrentUserActions.VERIFY_USER, verifyUser);
}
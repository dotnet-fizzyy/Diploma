import { push } from 'connected-react-router';
import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import UserApi from '../../api/userApi';
import { DefaultRoute, LoginScreenRoute } from '../../constants/routeConstants';
import { IAuthenticationResponse, IJsonPatchBody, ITokenResponse } from '../../types';
import { IFullUser, IUser } from '../../types/userTypes';
import { setCredentialsToLocalStorage } from '../../utils';
import { createRequestBodyForUserUpdateLink } from '../../utils/userUtils';
import { closeModal } from '../actions/modalActions';
import {
    authenticationFailure,
    authenticationSuccess,
    changeUserActivityStatusFailure,
    changeUserActivityStatusSuccess,
    createUserFailure,
    createUserSuccess,
    refreshUserTokenFailure,
    refreshUserTokenRequest,
    refreshUserTokenSuccess,
    registrationFailure,
    registrationSuccess,
    updateAvatarFailure,
    updateAvatarSuccess,
    updatePasswordFailure,
    updatePasswordSuccess,
    updateProfileSettingsFailure,
    updateProfileSettingsSuccess,
    verifyUserFailure,
    verifyUserSuccess,
    IAuthenticationRequest,
    IChangeUserActivityStatusRequest,
    ICreateUserRequest,
    IRegistrationRequest,
    IUpdateAvatarRequest,
    IUpdatePasswordRequest,
    IUpdateProfileSettingsRequest,
    IVerifyUserRequest,
    UserActions,
} from '../actions/userActions';

function* authenticateUser(action: IAuthenticationRequest) {
    try {
        const authResponse: IAuthenticationResponse = yield call(UserApi.authenticate, action.payload);
        yield all([put(authenticationSuccess(authResponse.user)), put(push(DefaultRoute))]);

        setCredentialsToLocalStorage(authResponse.accessToken.value, authResponse.refreshToken.value);
    } catch (error) {
        yield put(authenticationFailure(error));
    }
}

function* createCustomer(action: IRegistrationRequest) {
    try {
        yield call(UserApi.createCustomer, action.payload);
        yield put(registrationSuccess());
    } catch (error) {
        yield put(registrationFailure(error));
    }
}

export function* verifyUser(action: IVerifyUserRequest) {
    try {
        const user: IFullUser = yield call(UserApi.getUserByToken);

        const isLoginRoute: boolean = action.payload === LoginScreenRoute;

        yield all([
            put(verifyUserSuccess(user)),
            put(push(isLoginRoute ? DefaultRoute : action.payload)),
            refreshUserTokenRequest(),
        ]);
    } catch (error) {
        yield put(verifyUserFailure(error));
    }
}

function* createUser(action: ICreateUserRequest) {
    try {
        const createdUser: IUser = yield call(UserApi.createUser, action.payload);

        yield put(createUserSuccess(createdUser));
        yield put(closeModal());
    } catch (error) {
        yield put(createUserFailure(error));
    }
}

function* updateAvatarLink(action: IUpdateAvatarRequest) {
    try {
        const { file, userId } = action.payload;
        const avatarLink: string = yield call(UserApi.uploadImageOnCloud, file);
        const requestBody: IJsonPatchBody[] = createRequestBodyForUserUpdateLink(userId, avatarLink);
        yield call(UserApi.updateAvatarLink, requestBody);

        yield put(updateAvatarSuccess(avatarLink));
    } catch (error) {
        yield put(updateAvatarFailure(error));
    }
}

function* updatePassword(action: IUpdatePasswordRequest) {
    try {
        const { oldPassword, newPassword } = action.payload;
        yield call(UserApi.updatePassword, oldPassword, newPassword);

        yield put(updatePasswordSuccess());
    } catch (error) {
        yield put(updatePasswordFailure(error));
    }
}

function* updateProfileSettings(action: IUpdateProfileSettingsRequest) {
    try {
        const user: IFullUser = yield call(UserApi.updateUser, action.payload);

        yield put(updateProfileSettingsSuccess(user));
    } catch (error) {
        yield put(updateProfileSettingsFailure(error));
    }
}

function* changeUserActivityStatus(action: IChangeUserActivityStatusRequest) {
    try {
        const { userId, isActive } = action.payload;

        yield call(UserApi.changeActivityStatus, userId, isActive);

        yield put(changeUserActivityStatusSuccess(userId));
    } catch (error) {
        yield put(changeUserActivityStatusFailure(error));
    }
}

export function* refreshUserToken() {
    try {
        yield delay(180000);

        const tokensPair: ITokenResponse = yield call(UserApi.refreshToken);

        yield put(refreshUserTokenSuccess());
        setCredentialsToLocalStorage(tokensPair.accessToken.value, tokensPair.refreshToken.value);
    } catch (error) {
        yield put(refreshUserTokenFailure(error));
    }
}

export default function* rootCurrentUserSaga() {
    yield takeLatest(UserActions.AUTHENTICATION_REQUEST, authenticateUser);
    yield takeLatest(UserActions.REGISTRATION_REQUEST, createCustomer);
    yield takeLatest(UserActions.VERIFY_USER_REQUEST, verifyUser);
    yield takeLatest(UserActions.CREATE_USER_REQUEST, createUser);
    yield takeLatest(UserActions.UPDATE_AVATAR_REQUEST, updateAvatarLink);
    yield takeLatest(UserActions.UPDATE_USER_PASSWORD_REQUEST, updatePassword);
    yield takeLatest(UserActions.UPDATE_PROFILE_SETTINGS_REQUEST, updateProfileSettings);
    yield takeLatest(UserActions.CHANGE_USER_ACTIVITY_STATUS_REQUEST, changeUserActivityStatus);
    yield takeLatest(UserActions.REFRESH_USER_TOKEN_REQUEST, refreshUserToken);
}

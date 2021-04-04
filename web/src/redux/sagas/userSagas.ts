import { call, put, select, takeLatest } from 'redux-saga/effects';
import UserApi from '../../api/userApi';
import { AuthenticationResponse, IJsonPatchBody } from '../../types';
import { ITeam } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';
import { clearCredentialsFromLocalStorage, setCredentialsToLocalStorage } from '../../utils';
import { createRequestBodyForUserUpdateLink } from '../../utils/userHelper';
import { closeModal } from '../actions/modalActions';
import { hideSpinner } from '../actions/requestProcessorActions';
import {
    addUser,
    authenticationFailure,
    authenticationSuccess,
    createUserFailure,
    createUserSuccess,
    registrationFailure,
    registrationSuccess,
    updateAvatarFailure,
    updateAvatarSuccess,
    updatePasswordFailure,
    updatePasswordSuccess,
    verifyUserFailure,
    verifyUserSuccess,
    IAuthenticationRequest,
    ICreateUserRequest,
    IRegistrationRequest,
    IUpdateAvatarRequest,
    IUpdatePasswordRequest,
    UserActions,
    IUpdateProfileSettingsRequest,
    updateProfileSettingsFailure,
    updateProfileSettingsSuccess,
} from '../actions/userActions';
import { getCurrentTeam } from '../selectors/teamSelectors';

function* authenticateUser(action: IAuthenticationRequest) {
    try {
        const authResponse: AuthenticationResponse = yield call(UserApi.authenticate, action.payload);
        yield put(authenticationSuccess(authResponse));
        yield put(hideSpinner());

        setCredentialsToLocalStorage(authResponse.accessToken.value, authResponse.refreshToken.value);
    } catch (error) {
        yield put(authenticationFailure(error));
        yield put(hideSpinner());
    }
}

function* createCustomer(action: IRegistrationRequest) {
    try {
        yield call(UserApi.createCustomer, action.payload);
        yield put(registrationSuccess());
        yield put(hideSpinner());
    } catch (error) {
        yield put(registrationFailure(error));
        yield put(hideSpinner());
    }
}

function* logOutUser() {
    clearCredentialsFromLocalStorage();

    yield put(addUser(null));
}

function* verifyUser() {
    try {
        const user: IUser = yield call(UserApi.getUserByToken);

        yield put(verifyUserSuccess(user));
    } catch (error) {
        yield put(verifyUserFailure(error));
    }
}

function* createUser(action: ICreateUserRequest) {
    try {
        const currentTeam: ITeam = yield select(getCurrentTeam);
        action.payload.teamId = currentTeam.teamId;

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
        const user: IUser = yield call(UserApi.updateUser, action.payload);

        yield put(updateProfileSettingsSuccess(user));
    } catch (error) {
        yield put(updateProfileSettingsFailure(error));
    }
}

export default function* rootCurrentUserSaga() {
    yield takeLatest(UserActions.AUTHENTICATION_REQUEST, authenticateUser);
    yield takeLatest(UserActions.REGISTRATION_REQUEST, createCustomer);
    yield takeLatest(UserActions.LOGOUT_USER, logOutUser);
    yield takeLatest(UserActions.VERIFY_USER_REQUEST, verifyUser);
    yield takeLatest(UserActions.CREATE_USER_REQUEST, createUser);
    yield takeLatest(UserActions.UPDATE_AVATAR_REQUEST, updateAvatarLink);
    yield takeLatest(UserActions.UPDATE_USER_PASSWORD_REQUEST, updatePassword);
    yield takeLatest(UserActions.UPDATE_PROFILE_SETTINGS_REQUEST, updateProfileSettings);
}

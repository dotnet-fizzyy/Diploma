import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import UserApi from '../../api/userApi';
import { UserPosition, UserRole } from '../../constants/userConstants';
import {
    verifyUserFailure,
    verifyUserRequest,
    verifyUserSuccess,
    IVerifyUserRequest,
    UserActions,
} from '../../redux/actions/userActions';
import { verifyUser } from '../../redux/sagas/userSagas';
import { IFullUser } from '../../types/userTypes';

describe('User sagas tests', () => {
    it(`Should verify user successfully on ${UserActions.VERIFY_USER_REQUEST}`, () => {
        //Arrange
        const user: IFullUser = {
            avatarLink: '',
            email: '',
            isActive: true,
            projects: [],
            teamId: '',
            teams: [],
            userId: 'user_id',
            userName: 'user_name',
            userPosition: UserPosition.Developer,
            userRole: UserRole.Engineer,
        };

        const action: IVerifyUserRequest = verifyUserRequest('init-route');

        //Act & Assert
        return expectSaga(verifyUser, action)
            .provide([[call(UserApi.getUserByToken), user]])
            .put(verifyUserSuccess(user))
            .run();
    });

    it(`Should throw error on verifying user on ${UserActions.VERIFY_USER_REQUEST}`, () => {
        //Arrange
        const error = new Error('test');

        const action: IVerifyUserRequest = verifyUserRequest('init-route');

        //Act & Assert
        return expectSaga(verifyUser, action)
            .provide([[call(UserApi.getUserByToken), throwError(error)]])
            .put(verifyUserFailure(error))
            .run();
    });
});

import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import UserApi from '../../api/userApi';
import { UserPosition, UserRole } from '../../constants/userConstants';
import { verifyUserFailure, verifyUserSuccess } from '../../redux/actions/userActions';
import { verifyUser } from '../../redux/sagas/userSagas';
import { IFullUser } from '../../types/userTypes';

describe('User sagas tests', () => {
    it('Should verify user successfully', () => {
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

        //Act & Assert
        return expectSaga(verifyUser)
            .provide([[call(UserApi.getUserByToken), user]])
            .put(verifyUserSuccess(user))
            .run();
    });

    it('Should throw error on verifying user', () => {
        //Arrange
        const error = new Error('test');

        //Act & Assert
        return expectSaga(verifyUser)
            .provide([[call(UserApi.getUserByToken), throwError(error)]])
            .put(verifyUserFailure(error))
            .run();
    });
});

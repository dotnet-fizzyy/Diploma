import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as projectApi from '../../ajax/projectApi';
import { ICollectionResponse } from '../../types';
import { IProject } from '../../types/projectTypes';
import { IUser, UserRole } from '../../types/userTypes';
import * as modalActions from '../actions/modalActions';
import * as projectActions from '../actions/projectActions';
import * as userSelectors from '../selectors/userSelectors';

function* getUserProjects(action: projectActions.IGetUserProjectsRequest) {
    try {
        const currentUser: IUser = yield select(userSelectors.getUser);
        let projects: ICollectionResponse<IProject>;

        if (currentUser.userRole === UserRole.ProductOwner) {
            projects = yield call(projectApi.getCustomerProjects);
        } else {
            projects = yield call(projectApi.getAllUserProjects);
        }

        yield put(projectActions.getUserProjectsSuccess(projects.items));
    } catch (error) {
        yield put(projectActions.getUserProjectsFailure(error));
    }
}

function* createProject(action: projectActions.ICreateProjectRequest) {
    try {
        const currentUser: IUser = yield select(userSelectors.getUser);
        action.payload.customer = currentUser.userId;

        const createdProject: IProject = yield call(projectApi.createProject, action.payload);

        yield put(projectActions.createProjectSuccess(createdProject));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(projectActions.createProjectFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(projectActions.ProjectActions.CREATE_PROJECT_REQUEST, createProject);
    yield takeLatest(projectActions.ProjectActions.GET_USER_PROJECTS_REQUEST, getUserProjects);
}

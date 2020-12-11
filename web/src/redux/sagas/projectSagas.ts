import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as projectApi from '../../ajax/projectApi';
import { ICollectionResponse } from '../../types';
import { IProject } from '../../types/projectTypes';
import { IUser, UserRole } from '../../types/userTypes';
import * as modalActions from '../actions/modalActions';
import { IGetProjectRequest } from '../actions/projectActions';
import * as projectActions from '../actions/projectActions';
import * as userSelectors from '../selectors/userSelectors';
import * as teamActions from '../actions/teamActions';

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

        const userTeams = projects.items.reduce((accumulator, project) => accumulator.concat(project.teams), []);

        yield put(teamActions.getUserTeamsSuccess(userTeams));
    } catch (error) {
        yield put(projectActions.getUserProjectsFailure(error));
    }
}

function* getProject(action: IGetProjectRequest) {
    try {
        const project: IProject = yield call(projectApi.getProject, action.payload);

        yield put(projectActions.getProjectSuccess(project));
    } catch (error) {
        yield put(projectActions.getProjectFailure(error));
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
    yield takeLatest(projectActions.ProjectActions.GET_PROJECT_REQUEST, getProject);
    yield takeLatest(projectActions.ProjectActions.GET_USER_PROJECTS_REQUEST, getUserProjects);
}

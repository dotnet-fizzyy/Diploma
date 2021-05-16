import { all, call, put, takeLatest } from 'redux-saga/effects';
import ProjectApi from '../../api/projectApi';
import { IBoardPage, IProject, IProjectPage } from '../../types/projectTypes';
import { addEpics, addSimpleEpics } from '../actions/epicActions';
import {
    createProjectFailure,
    createProjectSuccess,
    getBoardInfoFailure,
    getProjectFailure,
    getProjectSuccess,
    getUserProjectPageFailure,
    getUserProjectPageSuccess,
    setSelectedProject,
    updateProjectFailure,
    updateProjectSuccess,
    ICreateProjectRequest,
    IGetBoardInfoRequest,
    IGetProjectRequest,
    IGetUserProjectPageRequest,
    IUpdateProjectRequest,
    ProjectActions,
} from '../actions/projectActions';
import { addSprints } from '../actions/sprintActions';
import { addStories } from '../actions/storyActions';
import { addTeamSimpleItems, setSelectedTeam } from '../actions/teamActions';

function* getUserProjectPage(action: IGetUserProjectPageRequest) {
    try {
        const projectPage: IProjectPage = yield call(ProjectApi.getProjectPage, action.payload);

        yield all([
            put(getUserProjectPageSuccess(projectPage.project)),
            put(addTeamSimpleItems(projectPage.teams)),
            put(addEpics(projectPage.epics)),
        ]);
    } catch (error) {
        yield put(getUserProjectPageFailure(error));
    }
}

function* getProject(action: IGetProjectRequest) {
    try {
        const project: IProject = yield call(ProjectApi.getProject, action.payload);

        yield put(getProjectSuccess(project));
    } catch (error) {
        yield put(getProjectFailure(error));
    }
}

function* createProject(action: ICreateProjectRequest) {
    try {
        const createdProject: IProject = yield call(ProjectApi.createProject, action.payload);

        yield put(createProjectSuccess(createdProject));
    } catch (error) {
        yield put(createProjectFailure(error));
    }
}

function* getBoardInfo(action: IGetBoardInfoRequest) {
    try {
        const { projectId, teamId } = action.payload;
        const { project, stories, sprints, team, epics }: IBoardPage = yield call(
            ProjectApi.getBoardPage,
            projectId,
            teamId
        );

        yield all([
            put(setSelectedProject(project)),
            put(setSelectedTeam(team)),
            put(addSimpleEpics(epics)),
            put(addSprints(sprints)),
            put(addStories(stories)),
        ]);
    } catch (error) {
        yield put(getBoardInfoFailure(error));
    }
}

export function* updateProject(action: IUpdateProjectRequest) {
    try {
        const updatedProject: IProject = yield call(ProjectApi.updateProject, action.payload);

        yield put(updateProjectSuccess(updatedProject));
    } catch (error) {
        yield put(updateProjectFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(ProjectActions.GET_USER_PROJECT_PAGE_REQUEST, getUserProjectPage);
    yield takeLatest(ProjectActions.CREATE_PROJECT_REQUEST, createProject);
    yield takeLatest(ProjectActions.GET_PROJECT_REQUEST, getProject);
    yield takeLatest(ProjectActions.GET_BOARD_INFO_REQUEST, getBoardInfo);
    yield takeLatest(ProjectActions.UPDATE_PROJECT_REQUEST, updateProject);
}

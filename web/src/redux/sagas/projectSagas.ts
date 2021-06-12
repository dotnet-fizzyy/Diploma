import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import ProjectApi from '../../api/projectApi';
import { IBoardPage, IDefaultPage, IFullStatsPage, IProject, IProjectPage } from '../../types/projectTypes';
import { addEpics, addSimpleEpics } from '../actions/epicActions';
import {
    createProjectFailure,
    createProjectSuccess,
    getBoardInfoFailure,
    getMainPageDataFailure,
    getMainPageDataSuccess,
    getProjectFailure,
    getProjectPageFailure,
    getProjectPageSuccess,
    getProjectStatsPageFailure,
    getProjectSuccess,
    removeProjectFailure,
    removeProjectSuccess,
    setSelectedProject,
    updateProjectFailure,
    updateProjectSuccess,
    ICreateProjectRequest,
    IGetBoardInfoRequest,
    IGetProjectPageRequest,
    IGetProjectRequest,
    IGetProjectStatsPageRequest,
    IRemoveProjectRequest,
    IUpdateProjectRequest,
    ProjectActions,
} from '../actions/projectActions';
import { addSprints } from '../actions/sprintActions';
import { addStories, setStorySimpleItems } from '../actions/storyActions';
import { addTeamSimpleItems, setSelectedTeam } from '../actions/teamActions';
import { getSelectedEpicId } from '../selectors/epicSelectors';
import { getSelectedSprintId } from '../selectors/sprintSelectors';

export function* getMainPage() {
    try {
        const defaultPageResult: IDefaultPage = yield call(ProjectApi.getDefaultPage);

        yield all([
            put(getMainPageDataSuccess(null)),
            put(setStorySimpleItems(defaultPageResult.stories)),
            put(addTeamSimpleItems(defaultPageResult.teams)),
        ]);
    } catch (error) {
        yield put(getMainPageDataFailure(error));
    }
}

export function* getProjectPage(action: IGetProjectPageRequest) {
    try {
        const projectPage: IProjectPage = yield call(ProjectApi.getProjectPage, action.payload);

        yield all([
            put(getProjectPageSuccess(projectPage.project)),
            put(addTeamSimpleItems(projectPage.teams)),
            put(addEpics(projectPage.epics)),
        ]);
    } catch (error) {
        yield put(getProjectPageFailure(error));
    }
}

export function* getProject(action: IGetProjectRequest) {
    try {
        const project: IProject = yield call(ProjectApi.getProject, action.payload);

        yield put(getProjectSuccess(project));
    } catch (error) {
        yield put(getProjectFailure(error));
    }
}

export function* createProject(action: ICreateProjectRequest) {
    try {
        const createdProject: IProject = yield call(ProjectApi.createProject, action.payload);

        yield put(createProjectSuccess(createdProject));
    } catch (error) {
        yield put(createProjectFailure(error));
    }
}

export function* getBoardInfo(action: IGetBoardInfoRequest) {
    try {
        const { projectId, teamId } = action.payload;
        const selectedEpicId: string = yield select(getSelectedEpicId);
        const selectedSprintId: string = yield select(getSelectedSprintId);

        const { project, stories, sprints, team, epics }: IBoardPage = yield call(
            ProjectApi.getBoardPage,
            projectId,
            teamId,
            selectedEpicId,
            selectedSprintId
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

export function* removeProject(action: IRemoveProjectRequest) {
    try {
        yield call(ProjectApi.removeProject, action.payload);

        yield put(removeProjectSuccess(action.payload));
    } catch (error) {
        yield put(removeProjectFailure(error));
    }
}

export function* getProjectStatsPage(action: IGetProjectStatsPageRequest) {
    try {
        const { project, epics, sprints, stories }: IFullStatsPage = yield call(
            ProjectApi.getProjectPageStats,
            action.payload
        );

        yield all([
            put(setSelectedProject(project)),
            put(addSimpleEpics(epics)),
            put(addSprints(sprints)),
            put(setStorySimpleItems(stories)),
        ]);
    } catch (error) {
        yield put(getProjectStatsPageFailure(error));
    }
}

export default function* rootStoriesSaga() {
    yield takeLatest(ProjectActions.GET_MAIN_PAGE_DATA_REQUEST, getMainPage);
    yield takeLatest(ProjectActions.GET_PROJECT_PAGE_REQUEST, getProjectPage);
    yield takeLatest(ProjectActions.CREATE_PROJECT_REQUEST, createProject);
    yield takeLatest(ProjectActions.GET_PROJECT_REQUEST, getProject);
    yield takeLatest(ProjectActions.GET_BOARD_INFO_REQUEST, getBoardInfo);
    yield takeLatest(ProjectActions.UPDATE_PROJECT_REQUEST, updateProject);
    yield takeLatest(ProjectActions.REMOVE_PROJECT_REQUEST, removeProject);
    yield takeLatest(ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST, getProjectStatsPage);
}

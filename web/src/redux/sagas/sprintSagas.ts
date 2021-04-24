import { call, put, select, takeLatest } from 'redux-saga/effects';
import SprintApi from '../../api/sprintApi';
import { IEpic } from '../../types/epicTypes';
import { IFullSprint, ISprint } from '../../types/sprintTypes';
import { IStory } from '../../types/storyTypes';
import { findCurrentEpic, mapFullSprintToSprint } from '../../utils/epicHelper';
import * as sprintsActions from '../actions/sprintsActions';
import * as sprintActions from '../actions/sprintsActions';
import * as storyActions from '../actions/storiesActions';
import * as epicsSelectors from '../selectors/epicsSelectors';

function* getSprints(action: sprintActions.IGetSprintsFromEpicRequest) {
    try {
        const sprints: ISprint[] = yield call(SprintApi.getSprintsFromEpic, action.payload);
        yield put(sprintActions.getSprintsFromEpicSuccess(sprints));
    } catch (error) {
        yield put(sprintActions.getSprintsFromEpicFailure(error));
    }
}

function* createSprint(action: sprintActions.ICreateSprintRequest) {
    try {
        const createdSprint: ISprint = yield call(SprintApi.createSprint, action.payload);
        yield put(sprintActions.createSprintSuccess(createdSprint));
    } catch (error) {
        yield put(sprintActions.createSprintFailure(error));
    }
}

function* getSprintsFromEpic() {
    const epics: IEpic[] = yield select(epicsSelectors.getEpics);
    const currentEpic: IEpic = findCurrentEpic(epics);

    const sprintsFromCurrentEpic: IFullSprint[] = yield call(SprintApi.getSprintsFromEpic, currentEpic.epicId);

    const sprints: ISprint[] = sprintsFromCurrentEpic.map((x) => mapFullSprintToSprint(x));
    yield put(sprintsActions.addSprints(sprints));

    const stories: IStory[] = sprintsFromCurrentEpic
        .map((x) => x.stories)
        .reduce((accumulator, stories) => accumulator.concat(stories), []);
    yield put(storyActions.storyActionAddStories(stories));
}

export default function* rootSprintsSaga() {
    yield takeLatest(sprintActions.SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST, getSprints);
    yield takeLatest(sprintActions.SprintActions.CREATE_SPRINT_REQUEST, createSprint);
    yield takeLatest(sprintActions.SprintActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST, getSprintsFromEpic);
}

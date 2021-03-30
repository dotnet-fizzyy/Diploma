import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as sprintApi from '../../api/sprintApi';
import { ICollectionResponse } from '../../types';
import { IEpic } from '../../types/epicTypes';
import { IFullSprint, ISprint } from '../../types/sprintTypes';
import { IStory } from '../../types/storyTypes';
import { findCurrentEpic, mapFullSprintToSprint } from '../../utils/epicHelper';
import * as modalActions from '../actions/modalActions';
import * as sprintsActions from '../actions/sprintsActions';
import * as sprintActions from '../actions/sprintsActions';
import * as storyActions from '../actions/storiesActions';
import * as epicsSelectors from '../selectors/epicsSelectors';
import * as epicSelectors from '../selectors/epicsSelectors';

function* getSprints(action: sprintActions.IGetSprintsRequest) {
    try {
        const sprints: ICollectionResponse<ISprint> = yield call(sprintApi.getSprintsFromEpic, action.payload);
        yield put(sprintActions.getSprintsSuccess(sprints.items));
    } catch (error) {
        yield put(sprintActions.getSprintsFailure(error));
    }
}

function* createSprint(action: sprintActions.ICreateSprintRequest) {
    try {
        const epic: IEpic = yield select(epicSelectors.getCurrentEpic);
        action.payload.epicId = epic.epicId;

        const createdSprint: ISprint = yield call(sprintApi.createSprint, action.payload);
        yield put(sprintActions.createSprintSuccess(createdSprint));
        yield put(modalActions.closeModal());
    } catch (error) {
        yield put(sprintActions.createSprintFailure(error));
    }
}

function* getSprintsFromEpic() {
    const epics: IEpic[] = yield select(epicsSelectors.getEpics);
    const currentEpic: IEpic = findCurrentEpic(epics);

    const sprintsFromCurrentEpic: ICollectionResponse<IFullSprint> = yield call(
        sprintApi.getSprintsFromEpic,
        currentEpic.epicId
    );

    const sprints: ISprint[] = sprintsFromCurrentEpic.items.map((x) => mapFullSprintToSprint(x));
    yield put(sprintsActions.addSprints(sprints));

    const stories: IStory[] = sprintsFromCurrentEpic.items
        .map((x) => x.stories)
        .reduce((accumulator, stories) => accumulator.concat(stories), []);
    yield put(storyActions.storyActionAddStories(stories));
}

export default function* rootSprintsSaga() {
    yield takeLatest(sprintActions.SprintActions.GET_SPRINTS_REQUEST, getSprints);
    yield takeLatest(sprintActions.SprintActions.CREATE_SPRINT_REQUEST, createSprint);
    yield takeLatest(sprintActions.SprintActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST, getSprintsFromEpic);
}

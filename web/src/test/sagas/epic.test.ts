import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import EpicsApi from '../../api/epicsApi';
import {
    changeStatsEpic,
    createEpicFailure,
    createEpicRequest,
    createEpicSuccess,
    removeEpicFailure,
    removeEpicRequest,
    removeEpicSuccess,
    updateEpicFailure,
    updateEpicRequest,
    updateEpicSuccess,
    EpicActions,
    IChangeStatsEpic,
    ICreateEpicRequest,
    IRemoveEpicRequest,
    IUpdateEpicRequest,
} from '../../redux/actions/epic';
import { changeStatsSearchItemsFailure } from '../../redux/actions/project';
import { addSprints } from '../../redux/actions/sprint';
import { setStorySimpleItems } from '../../redux/actions/story';
import { changeStatsSearchItems, createEpic, removeEpic, updateEpic } from '../../redux/sagas/epic';
import { IEpic } from '../../types/epic';
import { IStatsPage } from '../../types/project';

describe('Epic sagas tests', () => {
    it(`Should create epic on ${EpicActions.CREATE_EPIC_REQUEST}`, () => {
        //Arrange
        const epic: IEpic = {
            endDate: new Date(),
            epicDescription: 'EpicDescription',
            epicName: 'EpicName',
            projectId: 'project_id',
            startDate: new Date(),
        };
        const createdEpic: IEpic = {
            ...epic,
            epicId: 'EpicId',
            creationDate: new Date(),
        };

        const action: ICreateEpicRequest = createEpicRequest(epic);

        //Act & Assert
        return expectSaga(createEpic, action)
            .provide([[call(EpicsApi.createEpic, epic), createdEpic]])
            .put(createEpicSuccess(createdEpic))
            .run();
    });

    it(`Should throw error on epic creation on ${EpicActions.CREATE_EPIC_REQUEST}`, () => {
        //Arrange
        const epic: IEpic = {
            endDate: new Date(),
            epicDescription: 'EpicDescription',
            epicName: 'EpicName',
            projectId: 'project_id',
            startDate: new Date(),
        };
        const error = new Error('test');

        const action: ICreateEpicRequest = createEpicRequest(epic);

        //Act & Assert
        return expectSaga(createEpic, action)
            .provide([[call(EpicsApi.createEpic, epic), throwError(error)]])
            .put(createEpicFailure(error))
            .run();
    });

    it(`Should create epic on ${EpicActions.CREATE_EPIC_REQUEST}`, () => {
        //Arrange
        const epic: IEpic = {
            epicId: 'EpicId',
            creationDate: new Date(),
            endDate: new Date(),
            epicDescription: 'EpicDescription',
            epicName: 'EpicName',
            projectId: 'project_id',
            startDate: new Date(),
        };
        const updatedEpic: IEpic = {
            ...epic,
        };

        const action: IUpdateEpicRequest = updateEpicRequest(epic);

        //Act & Assert
        return expectSaga(updateEpic, action)
            .provide([[call(EpicsApi.updateEpic, epic), updatedEpic]])
            .put(updateEpicSuccess(updatedEpic))
            .run();
    });

    it(`Should throw error on epic update on ${EpicActions.UPDATE_EPIC_REQUEST}`, () => {
        //Arrange
        const epic: IEpic = {
            epicId: 'EpicId',
            creationDate: new Date(),
            endDate: new Date(),
            epicDescription: 'EpicDescription',
            epicName: 'EpicName',
            projectId: 'project_id',
            startDate: new Date(),
        };
        const error = new Error('test');

        const action: IUpdateEpicRequest = updateEpicRequest(epic);

        //Act & Assert
        return expectSaga(updateEpic, action)
            .provide([[call(EpicsApi.updateEpic, epic), throwError(error)]])
            .put(updateEpicFailure(error))
            .run();
    });

    it(`Should remove epic on ${EpicActions.REMOVE_EPIC_REQUEST}`, () => {
        //Arrange
        const epicId: string = 'EpicId';

        const action: IRemoveEpicRequest = removeEpicRequest(epicId);

        //Act & Assert
        return expectSaga(removeEpic, action)
            .provide([[call(EpicsApi.removeEpic, epicId), null]])
            .put(removeEpicSuccess(epicId))
            .run();
    });

    it(`Should throw error on epic remove on ${EpicActions.REMOVE_EPIC_REQUEST}`, () => {
        //Arrange
        const epicId: string = 'EpicId';
        const error = new Error('test');

        const action: IRemoveEpicRequest = removeEpicRequest(epicId);

        //Act & Assert
        return expectSaga(removeEpic, action)
            .provide([[call(EpicsApi.removeEpic, epicId), throwError(error)]])
            .put(removeEpicFailure(error))
            .run();
    });

    it(`Should get stats data on ${EpicActions.CHANGE_STATS_EPIC}`, () => {
        //Arrange
        const epicId: string = 'epic_id';
        const statsPage: IStatsPage = {
            sprints: [],
            stories: [],
        };

        const action: IChangeStatsEpic = changeStatsEpic(epicId);

        //Act & Assert
        return expectSaga(changeStatsSearchItems, action)
            .provide([[call(EpicsApi.getStatsSearchItems, epicId), statsPage]])
            .put(addSprints(statsPage.sprints))
            .put(setStorySimpleItems(statsPage.stories))
            .run();
    });

    it(`Should throw error on stats data receiving on ${EpicActions.CHANGE_STATS_EPIC}`, () => {
        //Arrange
        const epicId: string = 'epic_id';
        const error = new Error('test');

        const action: IChangeStatsEpic = changeStatsEpic(epicId);

        //Act & Assert
        return expectSaga(changeStatsSearchItems, action)
            .provide([[call(EpicsApi.getStatsSearchItems, epicId), throwError(error)]])
            .put(changeStatsSearchItemsFailure(error))
            .run();
    });
});

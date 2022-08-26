import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import SprintApi from '../../api/sprintApi';
import {
    createSprintFailure,
    createSprintRequest,
    createSprintSuccess,
    getSprintsFromEpicFailure,
    getSprintsFromEpicRequest,
    getSprintsFromEpicSuccess,
    removeSprintFailure,
    removeSprintRequest,
    removeSprintSuccess,
    updateSprintFailure,
    updateSprintRequest,
    updateSprintSuccess,
    ICreateSprintRequest,
    IGetSprintsFromEpicRequest,
    IRemoveSprintRequest,
    SprintActions,
} from '../../redux/actions/sprint';
import { createSprint, getSprints, removeSprint, updateSprint } from '../../redux/sagas/sprintSagas';
import { IState } from '../../redux/store/state';
import { ISprint } from '../../types/sprintTypes';

describe('Sprint sagas tests', () => {
    it(`Should get sprints from epic on ${SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST}`, () => {
        //Arrange
        const epicId: string = 'epic_id';
        const teamId: string = 'team_id';
        const sprints: ISprint[] = [];

        const action: IGetSprintsFromEpicRequest = getSprintsFromEpicRequest(epicId);

        //Act & Assert
        return expectSaga(getSprints, action)
            .withState({
                currentUser: {
                    selectedTeam: teamId,
                },
            } as IState)
            .provide([[call(SprintApi.getSprintsFromEpic, epicId, teamId), sprints]])
            .put(getSprintsFromEpicSuccess(sprints))
            .run();
    });

    it(`Should throw error on get sprints from epic on ${SprintActions.GET_SPRINTS_FROM_EPIC_REQUEST}`, () => {
        //Arrange
        const epicId: string = 'epic_id';
        const teamId: string = 'team_id';
        const error = new Error('test');

        const action: IGetSprintsFromEpicRequest = getSprintsFromEpicRequest(epicId);

        //Act & Assert
        return expectSaga(getSprints, action)
            .withState({
                currentUser: {
                    selectedTeam: teamId,
                },
            } as IState)
            .provide([[call(SprintApi.getSprintsFromEpic, epicId, teamId), throwError(error)]])
            .put(getSprintsFromEpicFailure(error))
            .run();
    });

    it(`Should create sprint on ${SprintActions.CREATE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprint: ISprint = {
            sprintName: 'SprintName',
            startDate: new Date(),
            endDate: new Date(),
            epicId: 'epic_id',
        };
        const createdSprint: ISprint = {
            ...sprint,
            sprintId: 'sprint_id',
            creationDate: new Date(),
        };

        const action: ICreateSprintRequest = createSprintRequest(sprint);

        //Act & Assert
        return expectSaga(createSprint, action)
            .provide([[call(SprintApi.createSprint, sprint), createdSprint]])
            .put(createSprintSuccess(createdSprint))
            .run();
    });

    it(`Should throw error on sprint creation on ${SprintActions.CREATE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprint: ISprint = {
            sprintName: 'SprintName',
            startDate: new Date(),
            endDate: new Date(),
            epicId: 'epic_id',
        };
        const error = new Error('test');

        const action: ICreateSprintRequest = createSprintRequest(sprint);

        //Act & Assert
        return expectSaga(createSprint, action)
            .provide([[call(SprintApi.createSprint, sprint), throwError(error)]])
            .put(createSprintFailure(error))
            .run();
    });

    it(`Should update sprint on ${SprintActions.UPDATE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprint: ISprint = {
            sprintId: 'sprint_id',
            creationDate: new Date(),
            sprintName: 'SprintName',
            startDate: new Date(),
            endDate: new Date(),
            epicId: 'epic_id',
        };
        const updatedSprint: ISprint = {
            ...sprint,
        };

        const action: ICreateSprintRequest = updateSprintRequest(sprint);

        //Act & Assert
        return expectSaga(updateSprint, action)
            .provide([[call(SprintApi.updateSprint, sprint), updatedSprint]])
            .put(updateSprintSuccess(updatedSprint))
            .run();
    });

    it(`Should throw error on sprint update on ${SprintActions.UPDATE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprint: ISprint = {
            sprintId: 'sprint_id',
            creationDate: new Date(),
            sprintName: 'SprintName',
            startDate: new Date(),
            endDate: new Date(),
            epicId: 'epic_id',
        };
        const error = new Error('test');

        const action: ICreateSprintRequest = updateSprintRequest(sprint);

        //Act & Assert
        return expectSaga(updateSprint, action)
            .provide([[call(SprintApi.updateSprint, sprint), throwError(error)]])
            .put(updateSprintFailure(error))
            .run();
    });

    it(`Should remove sprint on ${SprintActions.REMOVE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprintId: string = 'sprint_id';

        const action: IRemoveSprintRequest = removeSprintRequest(sprintId);

        //Act & Assert
        return expectSaga(removeSprint, action)
            .provide([[call(SprintApi.removeSprint, sprintId), null]])
            .put(removeSprintSuccess(sprintId))
            .run();
    });

    it(`Should throw error on sprint remove on ${SprintActions.REMOVE_SPRINT_REQUEST}`, () => {
        //Arrange
        const sprintId: string = 'sprint_id';
        const error = new Error('test');

        const action: IRemoveSprintRequest = removeSprintRequest(sprintId);

        //Act & Assert
        return expectSaga(removeSprint, action)
            .provide([[call(SprintApi.removeSprint, sprintId), throwError(error)]])
            .put(removeSprintFailure(error))
            .run();
    });
});

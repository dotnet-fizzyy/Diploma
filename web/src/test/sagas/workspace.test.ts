import { push } from 'connected-react-router';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import WorkSpaceApi from '../../api/workSpaceApi';
import { WorkspaceViewerRoute } from '../../constants/routes';
import {
    createWorkSpaceFailure,
    createWorkSpaceRequest,
    createWorkSpaceSuccess,
    getUserWorkSpacePageFailure,
    getUserWorkSpacePageSuccess,
    updateWorkSpaceFailure,
    updateWorkSpaceRequest,
    updateWorkSpaceSuccess,
    ICreateWorkSpaceRequest,
    WorkSpaceActions,
} from '../../redux/actions/workspace';
import { createWorkSpace, getUserWorkSpacePage, updateWorkSpace } from '../../redux/sagas/workspace';
import { IWorkSpace, IWorkSpacePage } from '../../types/workspace';

describe('WorkSpace sagas tests', () => {
    it(`Should create user workspace on ${WorkSpaceActions.CREATE_WORKSPACE_REQUEST}`, () => {
        //Arrange
        const workSpaceModel: IWorkSpace = { workSpaceDescription: 'description', workSpaceName: 'name' };
        const createdWorkSpaceModel: IWorkSpace = {
            workSpaceDescription: 'description',
            workSpaceName: 'name',
            workSpaceId: 'id',
            creationDate: new Date(),
        };

        const action: ICreateWorkSpaceRequest = createWorkSpaceRequest(workSpaceModel);

        //Act & Assert
        return expectSaga(createWorkSpace, action)
            .provide([[call(WorkSpaceApi.createWorkSpace, workSpaceModel), createdWorkSpaceModel]])
            .put(createWorkSpaceSuccess(createdWorkSpaceModel))
            .put(push(WorkspaceViewerRoute))
            .run();
    });

    it(`Should throw error on creating user workspace on ${WorkSpaceActions.CREATE_WORKSPACE_REQUEST}`, () => {
        //Arrange
        const workSpaceModel: IWorkSpace = { workSpaceDescription: 'description', workSpaceName: 'name' };
        const error = new Error('error');

        const action: ICreateWorkSpaceRequest = createWorkSpaceRequest(workSpaceModel);

        //Act && Assert
        return expectSaga(createWorkSpace, action)
            .provide([[call(WorkSpaceApi.createWorkSpace, workSpaceModel), throwError(error)]])
            .put(createWorkSpaceFailure(error))
            .run();
    });

    it(`Should get user workspace page data on ${WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST}`, () => {
        //Arrange
        const workSpacePage: IWorkSpacePage = {
            workSpace: {
                workSpaceDescription: 'description',
                workSpaceName: 'name',
                workSpaceId: 'id',
                creationDate: new Date(),
            },
            projects: [],
        };

        //Act & Assert
        return expectSaga(getUserWorkSpacePage)
            .provide([[call(WorkSpaceApi.getUserWorkSpace), workSpacePage]])
            .put(getUserWorkSpacePageSuccess(workSpacePage))
            .run();
    });

    it(`Should throw error on get user workspace page data on ${WorkSpaceActions.GET_USER_WORKSPACE_PAGE_REQUEST}`, () => {
        //Arrange
        const error = new Error('test');

        //Act & Assert
        return expectSaga(getUserWorkSpacePage)
            .provide([[call(WorkSpaceApi.getUserWorkSpace), throwError(error)]])
            .put(getUserWorkSpacePageFailure(error))
            .run();
    });

    it(`Should update user workspace on ${WorkSpaceActions.UPDATE_WORKSPACE_REQUEST}`, () => {
        //Arrange
        const workSpaceModel: IWorkSpace = {
            workSpaceDescription: 'description',
            workSpaceName: 'name',
            workSpaceId: 'id',
            creationDate: new Date(),
        };
        const updatedWorkSpaceModel: IWorkSpace = {
            workSpaceDescription: 'description',
            workSpaceName: 'name',
            workSpaceId: 'id',
            creationDate: new Date(),
        };

        const action: ICreateWorkSpaceRequest = updateWorkSpaceRequest(workSpaceModel);

        //Act & Assert
        return expectSaga(updateWorkSpace, action)
            .provide([[call(WorkSpaceApi.updateWorkSpace, workSpaceModel), updatedWorkSpaceModel]])
            .put(updateWorkSpaceSuccess(updatedWorkSpaceModel))
            .run();
    });

    it(`Should update user workspace on ${WorkSpaceActions.UPDATE_WORKSPACE_REQUEST}`, () => {
        //Arrange
        const workSpaceModel: IWorkSpace = {
            workSpaceDescription: 'description',
            workSpaceName: 'name',
            workSpaceId: 'id',
            creationDate: new Date(),
        };

        const error = new Error('test');

        const action: ICreateWorkSpaceRequest = updateWorkSpaceRequest(workSpaceModel);

        //Act & Assert
        return expectSaga(updateWorkSpace, action)
            .provide([[call(WorkSpaceApi.updateWorkSpace, workSpaceModel), throwError(error)]])
            .put(updateWorkSpaceFailure(error))
            .run();
    });
});

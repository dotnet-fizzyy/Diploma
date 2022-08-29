import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import TeamApi from '../../api/teamApi';
import {
    createTeamFailure,
    createTeamRequest,
    createTeamSuccess,
    getUserTeamPageFailure,
    getUserTeamPageRequest,
    getUserTeamPageSuccess,
    updateTeamFailure,
    updateTeamRequest,
    updateTeamSuccess,
    IGetUserTeamPageRequest,
    IUpdateTeamRequest,
    TeamActions,
} from '../../redux/actions/team';
import { addWorkSpace } from '../../redux/actions/workspace';
import { createTeam, getUserTeamPage, updateTeam } from '../../redux/sagas/team';
import { ITeam, ITeamPage } from '../../types/teamTypes';

describe('Team sagas tests', () => {
    it(`Should get team page belongs to user on ${TeamActions.GET_USER_TEAM_PAGE_REQUEST}`, () => {
        //Arrange
        const teamId: string = 'team_id';
        const teamPage: ITeamPage = {
            team: {
                teamId,
                teamName: 'team_name',
                membersCount: 0,
                location: 'Minsk',
                users: [],
            },
            workSpace: {
                workSpaceName: 'workspace_name',
                workSpaceDescription: 'workspace_description',
            },
        };

        const action: IGetUserTeamPageRequest = getUserTeamPageRequest(teamId);

        //Act & Assert
        return expectSaga(getUserTeamPage, action)
            .provide([[call(TeamApi.getUserTeamPage, teamId), teamPage]])
            .put(getUserTeamPageSuccess(teamPage.team))
            .put(addWorkSpace(teamPage.workSpace))
            .run();
    });

    it(`Should throw error on get team page belongs to user on ${TeamActions.GET_USER_TEAM_PAGE_REQUEST}`, () => {
        //Arrange
        const teamId: string = 'team_id';
        const error = new Error('test');

        const action: IGetUserTeamPageRequest = getUserTeamPageRequest(teamId);

        //Act & Assert
        return expectSaga(getUserTeamPage, action)
            .provide([[call(TeamApi.getUserTeamPage, teamId), throwError(error)]])
            .put(getUserTeamPageFailure(error))
            .run();
    });

    it(`Should create team on ${TeamActions.CREATE_TEAM_REQUEST}`, () => {
        //Arrange
        const team: ITeam = {
            teamId: null,
            users: [],
            location: 'Misnk',
            membersCount: 0,
            teamName: 'TeamName',
        };
        const createdTeam: ITeam = {
            ...team,
            teamId: 'teamId',
            location: 'Minsk',
        };

        const action: IUpdateTeamRequest = createTeamRequest(team);

        //Act & Assert
        return expectSaga(createTeam, action)
            .provide([[call(TeamApi.createTeam, team), createdTeam]])
            .put(createTeamSuccess(createdTeam))
            .run();
    });

    it(`Should throw error on team creation on ${TeamActions.CREATE_TEAM_REQUEST}`, () => {
        //Arrange
        const team: ITeam = {
            teamId: null,
            users: [],
            location: 'Misnk',
            membersCount: 0,
            teamName: 'TeamName',
        };

        const error = new Error('test');

        const action: IUpdateTeamRequest = createTeamRequest(team);

        //Act & Assert
        return expectSaga(createTeam, action)
            .provide([[call(TeamApi.createTeam, team), throwError(error)]])
            .put(createTeamFailure(error))
            .run();
    });

    it(`Should update team on ${TeamActions.UPDATE_TEAM_REQUEST}`, () => {
        //Arrange
        const team: ITeam = {
            location: 'Misnk',
            membersCount: 0,
            teamId: 'team_id',
            teamName: 'TeamName',
            users: [],
        };
        const updatedTeam: ITeam = { ...team };

        const action: IUpdateTeamRequest = updateTeamRequest(team);

        //Act & Assert
        return expectSaga(updateTeam, action)
            .provide([[call(TeamApi.updateTeam, team), updatedTeam]])
            .put(updateTeamSuccess(updatedTeam))
            .run();
    });

    it(`Should throw error on team update on on ${TeamActions.UPDATE_TEAM_REQUEST}`, () => {
        //Arrange
        const team: ITeam = {
            location: 'Misnk',
            membersCount: 0,
            teamId: 'team_id',
            teamName: 'TeamName',
            users: [],
        };
        const error = new Error('test');

        const action: IUpdateTeamRequest = updateTeamRequest(team);

        //Act & Assert
        return expectSaga(updateTeam, action)
            .provide([[call(TeamApi.updateTeam, team), throwError(error)]])
            .put(updateTeamFailure(error))
            .run();
    });
});

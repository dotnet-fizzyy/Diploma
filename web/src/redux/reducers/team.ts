import { ITeamSimpleModel } from '../../types/teamTypes';
import {
    IAddTeamSimpleItems,
    ICreateTeamSuccess,
    IRemoveTeamSuccess,
    ISetSelectedTeam,
    ISetSelectedTeamById,
    IUpdateTeamSuccess,
    TeamActions,
} from '../actions/team';
import { IChangeUserActivityStatusSuccess, ICreateUserSuccess, UserActions } from '../actions/user';
import { ITeamState } from '../store/state';

const initialState: ITeamState = {
    teams: [],
    simpleItems: [],
    selectedTeamId: '',
};

export default function teamsReducer(state = initialState, action) {
    switch (action.type) {
        case TeamActions.CREATE_TEAM_SUCCESS:
            return handleCreateTeamSuccess(state, action);
        case TeamActions.GET_USER_TEAM_PAGE_SUCCESS:
        case TeamActions.SET_SELECTED_TEAM:
            return handleSetSelectedTeam(state, action);
        case TeamActions.SET_SELECTED_TEAM_BY_ID:
            return handleSetSelectedTeamById(state, action);
        case UserActions.CREATE_USER_SUCCESS:
            return handleCreateUserSuccess(state, action);
        case TeamActions.ADD_TEAM_SIMPLE_ITEMS:
            return handleSetSimpleItems(state, action);
        case UserActions.CHANGE_USER_ACTIVITY_STATUS_SUCCESS:
            return handleUpdateUserActivityStatus(state, action);
        case TeamActions.UPDATE_TEAM_SUCCESS:
            return handleUpdateTeam(state, action);
        case TeamActions.REMOVE_TEAM_SUCCESS:
            return handleRemoveTeamSuccess(state, action);
        default:
            return state;
    }
}

const handleCreateTeamSuccess = (
    state: ITeamState,
    { payload: { teamId, teamName, creationDate, location } }: ICreateTeamSuccess
): ITeamState => {
    const simpleTeam: ITeamSimpleModel = {
        teamId,
        teamName,
        creationDate,
        location,
    };

    return {
        ...state,
        simpleItems: state.simpleItems.length ? [...state.simpleItems, simpleTeam] : [simpleTeam],
    };
};

const handleSetSelectedTeam = (state: ITeamState, action: ISetSelectedTeam): ITeamState => ({
    ...state,
    teams: [action.payload],
    selectedTeamId: action.payload.teamId,
});

const handleSetSelectedTeamById = (state: ITeamState, action: ISetSelectedTeamById): ITeamState => ({
    ...state,
    selectedTeamId: action.payload,
});

const handleCreateUserSuccess = (state: ITeamState, action: ICreateUserSuccess): ITeamState => ({
    ...state,
    teams: state.teams.map((team) =>
        team.teamId === state.selectedTeamId
            ? {
                  ...team,
                  users: team.users.concat(action.payload),
              }
            : team
    ),
});

const handleSetSimpleItems = (state: ITeamState, action: IAddTeamSimpleItems): ITeamState => ({
    ...state,
    simpleItems: action.payload,
});

const handleUpdateUserActivityStatus = (state: ITeamState, action: IChangeUserActivityStatusSuccess): ITeamState => ({
    ...state,
    teams: state.teams.map((team) =>
        team.teamId === state.selectedTeamId
            ? {
                  ...team,
                  users: team.users.map((user) =>
                      user.userId === action.payload ? { ...user, isActive: !user.isActive } : user
                  ),
              }
            : team
    ),
});

const handleUpdateTeam = (state: ITeamState, action: IUpdateTeamSuccess): ITeamState => ({
    ...state,
    teams: state.teams.map((team) =>
        team.teamId === action.payload.teamId ? { ...action.payload, users: team.users } : team
    ),
});

const handleRemoveTeamSuccess = (state: ITeamState, action: IRemoveTeamSuccess): ITeamState => ({
    ...state,
    simpleItems: state.simpleItems.filter((team) => team.teamId !== action.payload),
});

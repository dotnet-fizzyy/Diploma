import { ITeamSimpleModel } from '../../types/teamTypes';
import {
    IAddTeamSimpleItems,
    ICreateTeamSuccess,
    IRemoveTeamSuccess,
    ISetSelectedTeam,
    ISetSelectedTeamById,
    IUpdateTeamSuccess,
    TeamActions,
} from '../actions/teamActions';
import { IChangeUserActivityStatusSuccess, ICreateUserSuccess, UserActions } from '../actions/userActions';
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

function handleCreateTeamSuccess(state: ITeamState, action: ICreateTeamSuccess): ITeamState {
    const simpleTeam: ITeamSimpleModel = {
        teamId: action.payload.teamId,
        teamName: action.payload.teamName,
        creationDate: action.payload.creationDate,
    };

    return {
        ...state,
        simpleItems: state.simpleItems.length ? [...state.simpleItems, simpleTeam] : [simpleTeam],
    };
}

function handleSetSelectedTeam(state: ITeamState, action: ISetSelectedTeam): ITeamState {
    return {
        ...state,
        teams: [action.payload],
        selectedTeamId: action.payload.teamId,
    };
}

function handleSetSelectedTeamById(state: ITeamState, action: ISetSelectedTeamById): ITeamState {
    return {
        ...state,
        selectedTeamId: action.payload,
    };
}

function handleCreateUserSuccess(state: ITeamState, action: ICreateUserSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.map((x) =>
            x.teamId === state.selectedTeamId
                ? {
                      ...x,
                      users: x.users.concat(action.payload),
                  }
                : x
        ),
    };
}

function handleSetSimpleItems(state: ITeamState, action: IAddTeamSimpleItems): ITeamState {
    return {
        ...state,
        simpleItems: action.payload,
    };
}

function handleUpdateUserActivityStatus(state: ITeamState, action: IChangeUserActivityStatusSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.map((x) =>
            x.teamId === state.selectedTeamId
                ? {
                      ...x,
                      users: x.users.map((u) => (u.userId === action.payload ? { ...u, isActive: !u.isActive } : u)),
                  }
                : x
        ),
    };
}

function handleUpdateTeam(state: ITeamState, action: IUpdateTeamSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.map((x) => (x.teamId === action.payload.teamId ? { ...action.payload } : x)),
    };
}

function handleRemoveTeamSuccess(state: ITeamState, action: IRemoveTeamSuccess): ITeamState {
    return {
        ...state,
        simpleItems: state.simpleItems.filter((x) => x.teamId !== action.payload),
    };
}

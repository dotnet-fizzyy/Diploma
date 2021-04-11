import * as TeamActions from '../actions/teamActions';
import * as UserActions from '../actions/userActions';
import { ITeamState } from '../store/state';

const initialState: ITeamState = {
    teams: [],
    simpleItems: [],
    currentTeam: null,
};

export default function teamsReducer(state = initialState, action: TeamActions.TeamActionsType) {
    switch (action.type) {
        case TeamActions.TeamActions.CREATE_TEAM_SUCCESS:
            return handleCreateTeamSuccess(state, action);
        case TeamActions.TeamActions.GET_USER_TEAM_PAGE_SUCCESS:
        case TeamActions.TeamActions.SET_SELECTED_TEAM:
            return handleSetSelectedTeam(state, action);
        case TeamActions.TeamActions.SET_SELECTED_TEAM_BY_ID:
            return handleSetSelectedTeamById(state, action);
        case UserActions.UserActions.CREATE_USER_SUCCESS:
            return handleCreateUserSuccess(state, action as any);
        default:
            return state;
    }
}

function handleCreateTeamSuccess(state: ITeamState, action: TeamActions.ICreateTeamSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.length ? [...state.teams, action.payload] : [action.payload],
    };
}

function handleSetSelectedTeam(state: ITeamState, action: TeamActions.ISetSelectedTeam): ITeamState {
    return {
        ...state,
        currentTeam: action.payload,
    };
}

function handleSetSelectedTeamById(state: ITeamState, action: TeamActions.ISetSelectedTeamById): ITeamState {
    return {
        ...state,
        currentTeam: state.teams.find((x) => x.teamId === action.payload),
    };
}

function handleCreateUserSuccess(state: ITeamState, action: UserActions.ICreateUserSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.map((x) => {
            return x.teamId === action.payload.teamId
                ? {
                      ...x,
                      users: x.users.concat(action.payload),
                  }
                : x;
        }),
    };
}

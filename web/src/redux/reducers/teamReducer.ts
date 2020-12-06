import * as TeamActions from '../actions/teamActions';
import { ITeamState } from '../store/state';

const initialState: ITeamState = {
    teams: [],
    currentTeam: null,
};

export default function teamsReducer(state = initialState, action: TeamActions.TeamActionsType) {
    switch (action.type) {
        case TeamActions.TeamActions.CREATE_TEAM_SUCCESS:
            return handleCreateTeamSuccess(state, action);
        case TeamActions.TeamActions.ADD_TEAMS:
            return handleAddTeams(state, action);
        case TeamActions.TeamActions.SET_SELECTED_TEAM:
            return handleSetSelectedTeam(state, action);
        case TeamActions.TeamActions.SET_SELECTED_TEAM_BY_ID:
            return handleSetSelectedTeamById(state, action);
        default:
            return state;
    }
}

function handleCreateTeamSuccess(state: ITeamState, action: TeamActions.ICreateTeamSuccess): ITeamState {
    return {
        ...state,
        teams: [...state.teams, action.payload],
    };
}

function handleAddTeams(state: ITeamState, action: TeamActions.IAddTeams): ITeamState {
    return {
        ...state,
        teams: action.payload,
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

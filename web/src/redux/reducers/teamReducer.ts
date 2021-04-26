import * as TeamActions from '../actions/teamActions';
import * as UserActions from '../actions/userActions';
import { ITeamState } from '../store/state';

const initialState: ITeamState = {
    teams: [],
    simpleItems: [],
    selectedTeam: null,
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
        case TeamActions.TeamActions.ADD_TEAM_SIMPLE_ITEMS:
            return handleSetSimpleItems(state, action);
        case UserActions.UserActions.CHANGE_USER_ACTIVITY_STATUS_SUCCESS:
            return handleUpdateUserActivityStatus(state, action);
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
        selectedTeam: action.payload,
    };
}

function handleSetSelectedTeamById(state: ITeamState, action: TeamActions.ISetSelectedTeamById): ITeamState {
    return {
        ...state,
        selectedTeam: state.teams.find((x) => x.teamId === action.payload),
    };
}

function handleCreateUserSuccess(state: ITeamState, action: UserActions.ICreateUserSuccess): ITeamState {
    return {
        ...state,
        selectedTeam: {
            ...state.selectedTeam,
            users: state.selectedTeam.users.concat(action.payload),
        },
    };
}

function handleSetSimpleItems(state: ITeamState, action: TeamActions.IAddTeamSimpleItems): ITeamState {
    return {
        ...state,
        simpleItems: action.payload,
    };
}

function handleUpdateUserActivityStatus(
    state: ITeamState,
    action: UserActions.IChangeUserActivityStatusSuccess
): ITeamState {
    return {
        ...state,
        selectedTeam: {
            ...state.selectedTeam,
            users: state.selectedTeam.users.map((x) => {
                return x.userId === action.payload ? { ...x, isActive: !x.isActive } : x;
            }),
        },
    };
}

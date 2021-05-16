import {
    IAddTeamSimpleItems,
    ICreateTeamSuccess,
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
    selectedTeam: null,
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
        default:
            return state;
    }
}

function handleCreateTeamSuccess(state: ITeamState, action: ICreateTeamSuccess): ITeamState {
    return {
        ...state,
        teams: state.teams.length ? [...state.teams, action.payload] : [action.payload],
    };
}

function handleSetSelectedTeam(state: ITeamState, action: ISetSelectedTeam): ITeamState {
    return {
        ...state,
        selectedTeam: action.payload,
    };
}

function handleSetSelectedTeamById(state: ITeamState, action: ISetSelectedTeamById): ITeamState {
    return {
        ...state,
        selectedTeam: state.teams.find((x) => x.teamId === action.payload),
    };
}

function handleCreateUserSuccess(state: ITeamState, action: ICreateUserSuccess): ITeamState {
    return {
        ...state,
        selectedTeam: {
            ...state.selectedTeam,
            users: state.selectedTeam.users.concat(action.payload),
        },
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
        selectedTeam: {
            ...state.selectedTeam,
            users: state.selectedTeam.users.map((x) => {
                return x.userId === action.payload ? { ...x, isActive: !x.isActive } : x;
            }),
        },
    };
}

function handleUpdateTeam(state: ITeamState, action: IUpdateTeamSuccess): ITeamState {
    return {
        ...state,
        selectedTeam: {
            ...action.payload,
            users: state.selectedTeam.users,
        },
    };
}

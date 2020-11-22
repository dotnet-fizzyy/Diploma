import * as TeamActions from "../actions/teamActions";
import { ITeamState } from "../store/state";

const initialState: ITeamState = {
  teams: [],
  currentTeam: null,
};

export default function teamsReducer(
  state = initialState,
  action: TeamActions.TeamActionsType
) {
  switch (action.type) {
    case TeamActions.TeamActions.ADD_TEAMS:
      return handleAddTeams(state, action);
    case TeamActions.TeamActions.SET_SELECTED_TEAM:
      return handleSetSelectedTeam(state, action);
    default:
      return state;
  }
}

function handleAddTeams(
  state: ITeamState,
  action: TeamActions.IAddTeams
): ITeamState {
  return {
    ...state,
    teams: action.payload,
  };
}

function handleSetSelectedTeam(
  state: ITeamState,
  action: TeamActions.ISetSelectedTeam
): ITeamState {
  return {
    ...state,
    teams: [],
    currentTeam: state.teams.find((x) => x.teamId === action.payload),
  };
}

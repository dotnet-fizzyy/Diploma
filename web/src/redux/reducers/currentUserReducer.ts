import * as UserActions from "../actions/currentUserActions";
import { ICurrentUserState } from "../store/state";

const initialState: ICurrentUserState = {
  accessToken: "",
  refreshToken: "",
  user: null,
};

export default function currentUserReducer(
  state = initialState,
  action: UserActions.CurrentUserActionTypes
) {
  switch (action.type) {
    case UserActions.CurrentUserActions.ADD_USER:
      return handleAddUser(state, action);
    case UserActions.CurrentUserActions.SET_USER_TOKENS:
      return handleSetTokenPair(state, action);
    default:
      return state;
  }
}

function handleSetTokenPair(
  state: ICurrentUserState,
  action: UserActions.ISetUserTokens
): ICurrentUserState {
  return {
    ...state,
    accessToken: action.payload.accessToken,
    refreshToken: action.payload.refreshToken,
  };
}

function handleAddUser(
  state: ICurrentUserState,
  action: UserActions.IAddUser
): ICurrentUserState {
  return {
    ...state,
    user: action.payload,
  };
}

import { ICurrentUserState } from "../store/state";

const initialState: ICurrentUserState = {
  access_token: "",
};

export default function currentUserReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return initialState;
  }
}

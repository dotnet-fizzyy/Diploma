export interface IState {
  currentUser: ICurrentUserState;
}

export interface ICurrentUserState {
  access_token: string;
}

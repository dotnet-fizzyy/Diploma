import { ITokenPair } from "../../types";
import { IAuthenticationUser, IUser } from "../../types/userTypes";

export const CurrentUserActions = {
  AUTHENTICATION_REQUEST: "AUTHENTICATION_REQUEST",
  AUTHENTICATION_FAILURE: "AUTHENTICATION_FAILURE",
  REGISTRATION_REQUEST: "REGISTRATION_REQUEST",
  REGISTRATION_FAILURE: "REGISTRATION_REQUEST",
  ADD_USER: "ADD_USER",
  SET_USER_TOKENS: "SET_USER_TOKENS",
};

//interfaces
export interface IAuthenticationRequest {
  type: typeof CurrentUserActions.AUTHENTICATION_REQUEST;
  payload: IAuthenticationUser;
}

export interface IAuthenticationFailure {
  type: typeof CurrentUserActions.AUTHENTICATION_FAILURE;
  payload: Error;
}

export interface IRegistrationRequest {
  type: typeof CurrentUserActions.REGISTRATION_REQUEST;
  payload: IAuthenticationUser;
}

export interface IRegistrationFailure {
  type: typeof CurrentUserActions.REGISTRATION_FAILURE;
  payload: Error;
}

export interface IAddUser {
  type: typeof CurrentUserActions.ADD_USER;
  payload: IUser;
}

export interface ISetUserTokens {
  type: typeof CurrentUserActions.SET_USER_TOKENS;
  payload: ITokenPair;
}

//actions
export function registrationRequest(
  userName: string,
  password: string
): IRegistrationRequest {
  return {
    type: CurrentUserActions.REGISTRATION_REQUEST,
    payload: {
      userName,
      password,
    },
  };
}

export function registrationFailure(error: Error): IRegistrationFailure {
  return {
    type: CurrentUserActions.REGISTRATION_FAILURE,
    payload: error,
  };
}

export function authenticationRequest(
  userName: string,
  password: string
): IAuthenticationRequest {
  return {
    type: CurrentUserActions.AUTHENTICATION_REQUEST,
    payload: {
      userName,
      password,
    },
  };
}

export function authenticationFailure(error: Error): IAuthenticationFailure {
  return {
    type: CurrentUserActions.AUTHENTICATION_FAILURE,
    payload: error,
  };
}

export function addUser(user: IUser): IAddUser {
  return {
    type: CurrentUserActions.ADD_USER,
    payload: user,
  };
}

export function setUserTokens(tokenPair: ITokenPair): ISetUserTokens {
  return {
    type: CurrentUserActions.SET_USER_TOKENS,
    payload: tokenPair,
  };
}

export type CurrentUserActionTypes = IAddUser & ISetUserTokens;

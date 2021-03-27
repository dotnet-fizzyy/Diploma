import { IUser } from '../../types/userTypes';
import { IState } from '../store/state';

export function getAccessToken(state: IState): string {
    return state.currentUser.accessToken;
}

export function getRefreshToken(state: IState): string {
    return state.currentUser.refreshToken;
}

export function getUser(state: IState): IUser {
    return state.currentUser.user;
}

export function getIsAuthenticationSuccessful(state: IState): boolean {
    return state.currentUser.isAuthenticationSuccessful;
}

export function getWasCustomerCreated(state: IState): boolean {
    return state.currentUser.wasCustomerCreated;
}

export function getIsUserLoading(state: IState): boolean {
    return state.currentUser.isLoading;
}

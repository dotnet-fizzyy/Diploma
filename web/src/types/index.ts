import { IFullUser } from './userTypes';

export enum TokenType {
    ACCESS = 'Access',
    REFRESH = 'Refresh',
}

export interface ITokenResponse {
    accessToken: IToken;
    refreshToken: IToken;
}

export interface IAuthenticationResponse extends ITokenResponse {
    user: IFullUser;
}

export interface IToken {
    type: TokenType;
    value: string;
}

export interface IJsonPatchBody {
    op: string;
    path: string;
    value: string;
}

export interface ICollectionResponse<T> {
    items: T[];
    count: number;
}

export interface IApplicationRoute {
    path: string;
    exact: boolean;
    component: () => JSX.Element;
    isCustomer?: boolean;
}

export interface IBaseAction {
    type: string;
}

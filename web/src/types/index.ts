import { IEpic } from './epicTypes';
import { IProject } from './projectTypes';
import { ISprint } from './sprintTypes';
import { IFullUser } from './userTypes';

export enum SpinnerComponent {
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
    SIDEBAR = 'SIDEBAR',
    STORY_HISTORY = 'STORY_HISTORY',
}

export enum TokenType {
    ACCESS = 'Access',
    REFRESH = 'Refresh',
}

export interface IFullProjectDescription {
    project: IProject;
    epic: IEpic;
    sprints: ISprint[];
}

export interface AuthenticationResponse {
    accessToken: IToken;
    refreshToken: IToken;
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
}

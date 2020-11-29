import { IEpic } from './epicTypes';
import { IProject } from './projectTypes';
import { IUser } from './userTypes';

export enum SpinnerComponent {
    LOGIN = 'LOGIN',
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
    sprints: [];
}

export interface AuthenticationResponse {
    accessToken: IToken;
    refreshToken: IToken;
    user: IUser;
}

export interface IToken {
    type: TokenType;
    value: string;
}

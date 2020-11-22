import { IEpicTypes } from './epicTypes';
import { IProject } from './projectTypes';

export enum SpinnerComponent {
    LOGIN = 'LOGIN',
    SIDEBAR = 'SIDEBAR',
}

export interface IFullProjectDescription {
    project: IProject;
    epic: IEpicTypes;
    sprints: [];
}

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

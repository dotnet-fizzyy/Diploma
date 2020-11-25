import { IProject } from '../../types/projectTypes';

export const ProjectActions = {
    SET_PROJECTS: 'SET_PROJECTS',
    SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
};

//interfaces
export interface ISetProjects {
    type: typeof ProjectActions.SET_PROJECTS;
    payload: IProject[];
}

export interface ISetCurrentProject {
    type: typeof ProjectActions.SET_CURRENT_PROJECT;
    payload: IProject;
}

//actions
export function setProjects(projects: IProject[]): ISetProjects {
    return {
        type: ProjectActions.SET_PROJECTS,
        payload: projects,
    };
}

export function setCurrentProject(project: IProject): ISetCurrentProject {
    return {
        type: ProjectActions.SET_CURRENT_PROJECT,
        payload: project,
    };
}

export type ProjectActionTypes = ISetProjects & ISetCurrentProject;

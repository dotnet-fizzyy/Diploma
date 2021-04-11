import { IProject } from '../../types/projectTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getProjects(state: IState): IProject[] {
    return state.project.projects;
}

export function getProjectNames(state: IState): ISelectedItem[] {
    return state.project.projects.length
        ? state.project.projects.map((project) => {
              return {
                  key: project.projectId,
                  value: project.projectName,
              } as ISelectedItem;
          })
        : [];
}

export function getSelectProject(state: IState): IProject {
    return state.project.currentProject;
}

export function getSelectProjectId(state: IState): string {
    return state.project.currentProject ? state.project.currentProject.projectId : '';
}

import { IProject } from '../../types/projectTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import { IState } from '../store/state';

export function getProjects(state: IState): IProject[] {
    return state.project.items;
}

export function getProjectNames(state: IState): ISelectedItem[] {
    return state.project.items.length
        ? state.project.items.map((project) => {
              return {
                  key: project.projectId,
                  value: project.projectName,
              } as ISelectedItem;
          })
        : [];
}

export function getSelectedProject(state: IState): IProject {
    return state.project.items.find((x) => x.projectId === state.project.selectedProjectId);
}

export function getSelectProjectId(state: IState): string {
    return state.project.selectedProjectId;
}

export function getWorkSpacePageProjects(state: IState): IWorkSpacePageProject[] {
    return state.project.workSpaceItems;
}

export function getSelectedWorkSpaceProject(state: IState): IWorkSpacePageProject {
    return state.project.workSpaceItems.find((x) => x.projectId === state.project.selectedProjectId);
}

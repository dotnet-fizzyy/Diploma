import { IProject } from '../../types/project';
import { ISelectedItem } from '../../types/story';
import { IWorkSpacePageProject } from '../../types/workspace';
import { IState } from '../store/state';

export const getProjectNames = (state: IState): ISelectedItem[] =>
    state.project.items.length
        ? state.project.items.map(
              (project) =>
                  ({
                      key: project.projectId,
                      value: project.projectName,
                  } as ISelectedItem)
          )
        : [];

export const getSelectedProject = (state: IState): IProject =>
    state.project.items.find((project) => project.projectId === state.project.selectedProjectId);

export const getSelectProjectId = (state: IState): string => state.project.selectedProjectId;

export const getWorkSpacePageProjects = (state: IState): IWorkSpacePageProject[] => state.project.workSpaceItems;

export const getSelectedWorkSpaceProject = (state: IState): IWorkSpacePageProject =>
    state.project.workSpaceItems.find((workSpaceItem) => workSpaceItem.projectId === state.project.selectedProjectId);

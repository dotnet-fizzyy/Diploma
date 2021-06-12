import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import ProjectApi from '../../api/projectApi';
import { addEpics, addSimpleEpics } from '../../redux/actions/epicActions';
import {
    createProjectFailure,
    createProjectRequest,
    createProjectSuccess,
    getBoardInfoFailure,
    getBoardInfoRequest,
    getProjectFailure,
    getProjectPageRequest,
    getProjectPageSuccess,
    getProjectRequest,
    getProjectStatsPageFailure,
    getProjectStatsPageRequest,
    getProjectSuccess,
    removeProjectFailure,
    removeProjectRequest,
    removeProjectSuccess,
    setSelectedProject,
    updateProjectFailure,
    updateProjectRequest,
    updateProjectSuccess,
    ICreateProjectRequest,
    IGetBoardInfoRequest,
    IGetProjectPageRequest,
    IGetProjectRequest,
    IGetProjectStatsPageRequest,
    IRemoveProjectRequest,
    IUpdateProjectRequest,
    ProjectActions,
} from '../../redux/actions/projectActions';
import { addSprints } from '../../redux/actions/sprintActions';
import { addStories, setStorySimpleItems } from '../../redux/actions/storyActions';
import { addTeamSimpleItems, setSelectedTeam } from '../../redux/actions/teamActions';
import {
    createProject,
    getBoardInfo,
    getProject,
    getProjectPage,
    getProjectStatsPage,
    removeProject,
    updateProject,
} from '../../redux/sagas/projectSagas';
import { IState } from '../../redux/store/state';
import { IBoardPage, IFullStatsPage, IProject, IProjectPage } from '../../types/projectTypes';

describe('Project sagas tests', () => {
    it(`Should get board info for project and team on ${ProjectActions.GET_BOARD_INFO_REQUEST}`, () => {
        //Arrange
        const teamId: string = 'team_id';
        const projectId: string = 'project_id';
        const selectedEpicId: string = 'epic_id';
        const selectedSprintId: string = 'sprint_id';

        const board: IBoardPage = {
            project: {
                projectId,
                projectName: 'ProjectName',
                projectDescription: 'ProjectDescription',
                startDate: new Date(),
                endDate: new Date(),
            },
            team: {
                teamId,
                teamName: 'TeamName',
                membersCount: 0,
                location: 'Minsk',
                users: [],
            },
            sprints: [],
            stories: [],
            epics: [],
        };

        const action: IGetBoardInfoRequest = getBoardInfoRequest(projectId, teamId);

        //Act & Assert
        return expectSaga(getBoardInfo, action)
            .withState({
                epics: {
                    selectedEpicId,
                },
                sprints: {
                    selectedSprintId,
                },
            } as IState)
            .provide([[call(ProjectApi.getBoardPage, projectId, teamId, selectedEpicId, selectedSprintId), board]])
            .put(setSelectedProject(board.project))
            .put(setSelectedTeam(board.team))
            .put(addSimpleEpics(board.epics))
            .put(addSprints(board.sprints))
            .put(addStories(board.stories))
            .run();
    });

    it(`Should throw error on get board info for project and team on ${ProjectActions.GET_BOARD_INFO_REQUEST}`, () => {
        //Arrange
        const teamId: string = 'team_id';
        const projectId: string = 'project_id';
        const selectedEpicId: string = 'epic_id';
        const selectedSprintId: string = 'sprint_id';
        const error = new Error('test');

        const action: IGetBoardInfoRequest = getBoardInfoRequest(projectId, teamId);

        //Act & Assert
        return expectSaga(getBoardInfo, action)
            .withState({
                epics: {
                    selectedEpicId,
                },
                sprints: {
                    selectedSprintId,
                },
            } as IState)
            .provide([
                [call(ProjectApi.getBoardPage, projectId, teamId, selectedEpicId, selectedSprintId), throwError(error)],
            ])
            .put(getBoardInfoFailure(error))
            .run();
    });

    it(`Should get project page on ${ProjectActions.GET_PROJECT_PAGE_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const projectPage: IProjectPage = {
            project: {
                projectId,
                projectName: 'ProjectName',
                projectDescription: 'ProjectDescription',
                startDate: new Date(),
                endDate: new Date(),
            },
            epics: [],
            teams: [],
        };

        const action: IGetProjectPageRequest = getProjectPageRequest(projectId);

        //Act & Assert
        return expectSaga(getProjectPage, action)
            .provide([[call(ProjectApi.getProjectPage, projectId), projectPage]])
            .put(getProjectPageSuccess(projectPage.project))
            .put(addTeamSimpleItems(projectPage.teams))
            .put(addEpics(projectPage.epics))
            .run();
    });

    it(`Should get project by id on ${ProjectActions.GET_PROJECT_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const project: IProject = {
            projectId,
            projectName: 'ProjectName',
            projectDescription: 'ProjectDescription',
            startDate: new Date(),
            endDate: new Date(),
        };

        const action: IGetProjectRequest = getProjectRequest(projectId);

        //Act & Assert
        return expectSaga(getProject, action)
            .provide([[call(ProjectApi.getProject, projectId), project]])
            .put(getProjectSuccess(project))
            .run();
    });

    it(`Should throw error on get project by id on ${ProjectActions.GET_PROJECT_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const error = new Error('test');

        const action: IGetProjectRequest = getProjectRequest(projectId);

        //Act & Assert
        return expectSaga(getProject, action)
            .provide([[call(ProjectApi.getProject, projectId), throwError(error)]])
            .put(getProjectFailure(error))
            .run();
    });

    it(`Should create project on ${ProjectActions.CREATE_PROJECT_REQUEST}`, () => {
        //Arrange
        const project: IProject = {
            projectName: 'ProjectName',
            projectDescription: 'ProjectDescription',
            startDate: new Date(),
            endDate: new Date(),
        };
        const createdProject: IProject = {
            ...project,
            projectId: 'project_id',
            creationDate: new Date(),
        };

        const action: ICreateProjectRequest = createProjectRequest(project);

        //Act & Assert
        return expectSaga(createProject, action)
            .provide([[call(ProjectApi.createProject, project), createdProject]])
            .put(createProjectSuccess(createdProject))
            .run();
    });

    it(`Should throw error on project creation on ${ProjectActions.CREATE_PROJECT_REQUEST}`, () => {
        //Arrange
        const project: IProject = {
            projectName: 'ProjectName',
            projectDescription: 'ProjectDescription',
            startDate: new Date(),
            endDate: new Date(),
        };
        const error = new Error('test');

        const action: ICreateProjectRequest = createProjectRequest(project);

        //Act & Assert
        return expectSaga(createProject, action)
            .provide([[call(ProjectApi.createProject, project), throwError(error)]])
            .put(createProjectFailure(error))
            .run();
    });

    it(`Should update project on ${ProjectActions.UPDATE_PROJECT_REQUEST}`, () => {
        //Arrange
        const project: IProject = {
            projectId: 'project_id',
            projectName: 'ProjectName',
            projectDescription: 'ProjectDescription',
            startDate: new Date(),
            endDate: new Date(),
            creationDate: new Date(),
        };
        const updatedProject: IProject = {
            ...project,
        };

        const action: IUpdateProjectRequest = updateProjectRequest(project);

        //Act & Assert
        return expectSaga(updateProject, action)
            .provide([[call(ProjectApi.updateProject, project), updatedProject]])
            .put(updateProjectSuccess(project))
            .run();
    });

    it(`Should throw error on update project on ${ProjectActions.UPDATE_PROJECT_REQUEST}`, () => {
        //Arrange
        const project: IProject = {
            projectId: 'project_id',
            projectName: 'ProjectName',
            projectDescription: 'ProjectDescription',
            startDate: new Date(),
            endDate: new Date(),
            creationDate: new Date(),
        };
        const error = new Error('test');

        const action: IUpdateProjectRequest = updateProjectRequest(project);

        //Act & Assert
        return expectSaga(updateProject, action)
            .provide([[call(ProjectApi.updateProject, project), throwError(error)]])
            .put(updateProjectFailure(error))
            .run();
    });

    it(`Should remove project on ${ProjectActions.REMOVE_PROJECT_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';

        const action: IRemoveProjectRequest = removeProjectRequest(projectId);

        //Act & Assert
        return expectSaga(removeProject, action)
            .provide([[call(ProjectApi.removeProject, projectId), null]])
            .put(removeProjectSuccess(projectId))
            .run();
    });

    it(`Should throw error on project remove on ${ProjectActions.REMOVE_PROJECT_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const error = new Error('test');

        const action: IRemoveProjectRequest = removeProjectRequest(projectId);

        //Act & Assert
        return expectSaga(removeProject, action)
            .provide([[call(ProjectApi.removeProject, projectId), throwError(error)]])
            .put(removeProjectFailure(error))
            .run();
    });

    it(`Should get project stats page on ${ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const pageData: IFullStatsPage = {
            project: {
                projectName: 'ProjectName',
                projectDescription: 'ProjectDescription',
                startDate: new Date(),
                endDate: new Date(),
            },
            epics: [],
            sprints: [],
            stories: [],
        };

        const action: IGetProjectStatsPageRequest = getProjectStatsPageRequest(projectId);

        //Act & Assert
        return expectSaga(getProjectStatsPage, action)
            .provide([[call(ProjectApi.getProjectPageStats, projectId), pageData]])
            .put(setSelectedProject(pageData.project))
            .put(addSimpleEpics(pageData.epics))
            .put(addSprints(pageData.sprints))
            .put(setStorySimpleItems(pageData.stories))
            .run();
    });

    it(`Should throw error on project stats page receiving on ${ProjectActions.GET_PROJECTS_STATS_PAGE_REQUEST}`, () => {
        //Arrange
        const projectId: string = 'project_id';
        const error = new Error('test');

        const action: IGetProjectStatsPageRequest = getProjectStatsPageRequest(projectId);

        //Act & Assert
        return expectSaga(getProjectStatsPage, action)
            .provide([[call(ProjectApi.getProjectPageStats, projectId), throwError(error)]])
            .put(getProjectStatsPageFailure(error))
            .run();
    });
});

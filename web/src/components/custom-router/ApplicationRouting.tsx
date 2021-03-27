import * as routeConstants from '../../constants/routeConstants';
import MainPageContainer from '../../pages/default/MainPageContainer';
import { IApplicationRoute } from '../../types';
import BoardContainer from '../board/BoardContainer';
import ChartsContainer from '../charts/ChartsContainer';
import ProjectManagementContainer from '../management/project/ProjectManagementContainer';
import ProjectViewerContainer from '../management/project/ProjectViewerContainer';
import TeamManagementContainer from '../management/team/TeamManagementContainer';
import TeamsViewerContainer from '../management/team/TeamsViewerContainer';
import UndefinedPage from '../no-match/UndefinedPage';
import StoryFullViewContainer from '../story-full-view/StoryFullViewContainer';
import StoryHistoryContainer from '../story-history/StoryHistoryContainer';

export const ApplicationRouting: IApplicationRoute[] = [
    { path: routeConstants.DefaultRoute, exact: true, component: MainPageContainer },
    { path: routeConstants.ProjectBoardRoute, exact: false, component: BoardContainer },
    { path: routeConstants.ProjectsViewerRoute, exact: false, component: ProjectViewerContainer },
    { path: routeConstants.FullViewStoryRoute, exact: false, component: StoryFullViewContainer },
    { path: routeConstants.ViewStoryHistoryRoute, exact: false, component: StoryHistoryContainer },
    { path: routeConstants.TeamsViewerRoute, exact: false, component: TeamsViewerContainer },
    { path: routeConstants.TeamManagementRoute, exact: false, component: TeamManagementContainer },
    { path: routeConstants.ProjectManagementRoute, exact: false, component: ProjectManagementContainer },
    { path: routeConstants.EpicChartsRoute, exact: false, component: ChartsContainer },
    { path: routeConstants.NoMatchRoute, exact: false, component: UndefinedPage },
];

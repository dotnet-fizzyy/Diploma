import * as routeConstants from '../../constants/routeConstants';
import DefaultPageContainer from '../../pages/default/DefaultPageContainer';
import ProjectPageContainer from '../../pages/project/ProjectPageContainer';
import TeamPageContainer from '../../pages/team/TeamPageContainer';
import WorkSpacePageContainer from '../../pages/workspace/WorkSpacePageContainer';
import { IApplicationRoute } from '../../types';
import BoardContainer from '../board/BoardContainer';
import ChartsContainer from '../charts/ChartsContainer';
import UndefinedPage from '../no-match/UndefinedPage';
import StoryFullViewContainer from '../story-full-view/StoryFullViewContainer';
import StoryHistoryContainer from '../story-history/StoryHistoryContainer';

export const ApplicationRouting: IApplicationRoute[] = [
    { path: routeConstants.DefaultRoute, exact: true, component: DefaultPageContainer },
    { path: routeConstants.WorkspaceViewerRoute, exact: true, component: WorkSpacePageContainer },
    { path: routeConstants.ProjectBoardRoute, exact: false, component: BoardContainer },
    { path: routeConstants.FullViewStoryRoute, exact: false, component: StoryFullViewContainer },
    { path: routeConstants.ViewStoryHistoryRoute, exact: false, component: StoryHistoryContainer },
    { path: routeConstants.TeamManagementRoute, exact: false, component: TeamPageContainer },
    { path: routeConstants.ProjectManagementRoute, exact: false, component: ProjectPageContainer },
    { path: routeConstants.EpicChartsRoute, exact: false, component: ChartsContainer },
    { path: routeConstants.NoMatchRoute, exact: false, component: UndefinedPage },
];

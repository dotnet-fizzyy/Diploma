import {
    DefaultRoute,
    EpicChartsRoute,
    FullViewStoryRoute,
    NoMatchRoute,
    ProjectBoardRoute,
    ProjectManagementRoute,
    TeamManagementRoute,
    ViewStoryHistoryRoute,
    WorkspaceViewerRoute,
} from '../../constants/routeConstants';
import DefaultPageContainer from '../../pages/default/DefaultPageContainer';
import ProjectPageContainer from '../../pages/project/ProjectPageContainer';
import StatsPageContainer from '../../pages/stats/StatsPageContainer';
import StoryHistoryPageContainer from '../../pages/story-history/StoryHistoryPageContainer';
import TeamPageContainer from '../../pages/team/TeamPageContainer';
import WorkSpacePageContainer from '../../pages/workspace/WorkSpacePageContainer';
import { IApplicationRoute } from '../../types';
import BoardContainer from '../board/BoardContainer';
import UndefinedPage from '../no-match/UndefinedPage';
import StoryFullViewContainer from '../story-full-view/StoryFullViewContainer';

export const ApplicationRouting: IApplicationRoute[] = [
    { path: DefaultRoute, exact: true, component: DefaultPageContainer },
    { path: WorkspaceViewerRoute, exact: true, isCustomer: true, component: WorkSpacePageContainer },
    { path: ProjectBoardRoute, exact: false, component: BoardContainer },
    { path: FullViewStoryRoute, exact: false, component: StoryFullViewContainer },
    { path: ViewStoryHistoryRoute, exact: false, component: StoryHistoryPageContainer },
    { path: TeamManagementRoute, exact: false, component: TeamPageContainer },
    { path: ProjectManagementRoute, exact: false, isCustomer: true, component: ProjectPageContainer },
    { path: EpicChartsRoute, exact: false, component: StatsPageContainer },
    { path: NoMatchRoute, exact: false, component: UndefinedPage },
];

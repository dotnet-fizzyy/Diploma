//UI routes
export const DefaultRoute = '/';
export const FullViewStoryRoute = '/full-view/:storyId';
export const ProjectBoardRoute = '/board/:projectId';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const ViewStoryHistoryRoute = '/history/:storyId';
export const WorkspaceViewerRoute = '/workspace';
export const TeamsViewerRoute = '/teams';
export const ProjectsViewerRoute = '/projects';
export const TeamManagementRoute = '/team/:teamId';
export const ProjectManagementRoute = '/project/:projectId';
export const EpicChartsRoute = '/charts';
export const NoMatchRoute = '*';

//WebAPI routes
const getBaseUrl = (): string =>
    process.env.REACT_APP_ENVIRONMENT === 'docker'
        ? process.env.REACT_APP_BACK_DOCKER_URL
        : process.env.REACT_APP_BACK_URL;

const BaseUrl = `${getBaseUrl()}api`;

export const SignInUrl = `${BaseUrl}/auth/sign-in`;
export const SignUpUrl = `${BaseUrl}/auth/sign-up`;

export const UsersUrl = BaseUrl + '/user';
export const CustomerUrl = BaseUrl + '/customer';

const SprintBaseUrl = `${BaseUrl}/sprint`;
export const SprintUrls = {
    createSprint: SprintBaseUrl,
    getEpicSprints: `${SprintBaseUrl}/epic`,
};

const EpicBaseUrl = `${BaseUrl}/epic`;
export const EpicUrls = {
    createEpic: EpicBaseUrl,
    getProjectEpics: `${EpicBaseUrl}/project`,
};

const StoryBaseUrl = `${BaseUrl}/story`;
export const StoryUrls = {
    createStory: StoryBaseUrl,
    updateStory: StoryBaseUrl,
    boardMove: `${StoryBaseUrl}/board-move`,
    partUpdate: `${StoryBaseUrl}/part-update`,
    termSearch: `${StoryBaseUrl}/term`,
    sortStories: `${StoryBaseUrl}/sort`,
    storyHistory: `${StoryBaseUrl}/history`,
};

export const CustomerUrls = {
    customerProjects: CustomerUrl + '/projects',
    createTeam: CustomerUrl + '/team',
};

const ProjectBaseUrl = `${BaseUrl}/project`;
export const ProjectUrls = {
    createProject: ProjectBaseUrl,
    getProject: ProjectBaseUrl,
    getUserProjects: `${ProjectBaseUrl}/project-teams`,
};

const TeamBaseUrl = `${BaseUrl}/team`;
export const TeamUrls = {
    getUserTeams: TeamBaseUrl + '/user',
    createTeam: CustomerUrl + '/team',
};

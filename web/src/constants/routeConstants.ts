//UI routes
const routeGuidStringRegex: string = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';

export const DefaultRoute = '/';
export const FullViewStoryRoute = `/full-view/:storyId(${routeGuidStringRegex})`;
export const ProjectBoardRoute = '/board';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const ViewStoryHistoryRoute = `/history/:storyId(${routeGuidStringRegex})`;
export const WorkspaceViewerRoute = '/workspace';
export const TeamManagementRoute = `/team/:teamId(${routeGuidStringRegex})`;
export const ProjectManagementRoute = `/project/:projectId(${routeGuidStringRegex})`;
export const EpicChartsRoute = '/charts';
export const NoMatchRoute = '*';

//WebAPI routes
const getBaseUrl = (): string =>
    process.env.REACT_APP_ENVIRONMENT === 'docker'
        ? process.env.REACT_APP_BACK_DOCKER_URL
        : process.env.REACT_APP_BACK_URL;

const BaseUrl = `${getBaseUrl()}api`;

export const getCloudStorageUrl = (cloudinaryId: string): string =>
    `https://api.cloudinary.com/v1_1/${cloudinaryId}/upload`;

export const SignInUrl = `${BaseUrl}/auth/sign-in`;
export const SignUpUrl = `${BaseUrl}/auth/sign-up`;

const UserBaseUrl = `${BaseUrl}/user`;
const SprintBaseUrl = `${BaseUrl}/sprint`;
const EpicBaseUrl = `${BaseUrl}/epic`;
const StoryBaseUrl = `${BaseUrl}/story`;
const ProjectBaseUrl = `${BaseUrl}/project`;
const TeamBaseUrl = `${BaseUrl}/team`;
const WorkSpaceBaseUrl = `${BaseUrl}/workspace`;

const PageBaseUrl = `${BaseUrl}/page`;
const PageUrls = {
    getTeamPage: `${PageBaseUrl}/team`,
    getWorkSpacePage: `${PageBaseUrl}/workspace`,
    getProjectPage: `${PageBaseUrl}/project`,
    getBoardPage: `${PageBaseUrl}/board`,
    getStoryHistory: `${StoryBaseUrl}/full/id`,
    getFullProjectStatsPage: `${PageBaseUrl}/full-stats`,
    getSearchItems: `${PageBaseUrl}/search`,
    getDefaultPage: `${PageBaseUrl}/default`,
};

export const UserUrls = {
    getUserByToken: UserBaseUrl,
    createUser: `${UserBaseUrl}/team/id`,
    updateProfileSettings: UserBaseUrl,
    updateAvatarLink: `${UserBaseUrl}/avatar`,
    updatePassword: `${UserBaseUrl}/password`,
    changeStatus: `${UserBaseUrl}/activity`,
    refreshToken: `${BaseUrl}/auth/token-renew`,
    checkEmailExistence: `${BaseUrl}/auth/check-email`,
};

export const SprintUrls = {
    createSprint: SprintBaseUrl,
    updateSprint: SprintBaseUrl,
    getEpicSprints: `${SprintBaseUrl}/epic/id`,
    removeSprint: `${SprintBaseUrl}/soft-remove`,
};

export const EpicUrls = {
    createEpic: EpicBaseUrl,
    getProjectPage: PageUrls.getProjectPage,
    updateEpic: EpicBaseUrl,
    removeEpic: `${EpicBaseUrl}/soft-remove`,
    getStatsPageSearchItems: `${PageBaseUrl}/stats`,
};

export const StoryUrls = {
    createStory: StoryBaseUrl,
    updateStory: StoryBaseUrl,
    boardMove: `${StoryBaseUrl}/board-move`,
    partUpdate: `${StoryBaseUrl}/part-update`,
    termSearch: `${StoryBaseUrl}/term`,
    sortStories: `${StoryBaseUrl}/sort`,
    storyHistory: PageUrls.getStoryHistory,
    changeStatus: `${StoryBaseUrl}/change-status`,
    removeStory: `${StoryBaseUrl}/soft-remove`,
};

export const ProjectUrls = {
    getProjectPage: PageUrls.getProjectPage,
    createProject: ProjectBaseUrl,
    getProject: ProjectBaseUrl,
    getBoardPage: PageUrls.getBoardPage,
    updateProject: ProjectBaseUrl,
    removeProject: `${ProjectBaseUrl}/soft-remove`,
    getStatsPage: PageUrls.getFullProjectStatsPage,
    getDefaultPage: PageUrls.getDefaultPage,
};

export const TeamUrls = {
    getUserTeamPage: PageUrls.getTeamPage,
    createTeam: `${TeamBaseUrl}/customer`,
    updateTeam: TeamBaseUrl,
    removeTeam: `${TeamBaseUrl}/soft-remove`,
};

export const WorkSpaceUrls = {
    workSpacePage: PageUrls.getWorkSpacePage,
    updateWorkSpace: WorkSpaceBaseUrl,
    userWorkSpace: `${WorkSpaceBaseUrl}/user`,
    createWorkSpace: `${WorkSpaceBaseUrl}/user`,
    getSearchItems: PageUrls.getSearchItems,
};

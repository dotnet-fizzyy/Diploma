//UI routes
export const DefaultRoute = '/';
export const FullViewStoryRoute = '/full-view/:storyId';
export const ProjectBoardRoute = '/board/:projectId';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const ViewStoryHistoryRoute = '/history/:storyId';
export const WorkspaceViewerRoute = '/workspace';
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

export const getCloudStorageUrl = (cloudinaryId: string): string =>
    `https://api.cloudinary.com/v1_1/${cloudinaryId}/upload`;

export const SignInUrl = `${BaseUrl}/auth/sign-in`;
export const SignUpUrl = `${BaseUrl}/auth/sign-up`;

const PageBaseUrl = `${BaseUrl}/page`;
const PageUrls = {
    getTeamPage: `${PageBaseUrl}/team`,
    getWorkSpacePage: `${PageBaseUrl}/workspace`,
    getProjectPage: `${PageBaseUrl}/project`,
};

const UserBaseUrl = `${BaseUrl}/user`;
export const UserUrls = {
    getUserByToken: UserBaseUrl,
    createUser: UserBaseUrl,
    updateProfileSettings: UserBaseUrl,
    updateAvatarLink: `${UserBaseUrl}/avatar`,
    updatePassword: `${UserBaseUrl}/password`,
    changeStatus: `${UserBaseUrl}/activity`,
};

const SprintBaseUrl = `${BaseUrl}/sprint`;
export const SprintUrls = {
    createSprint: SprintBaseUrl,
    getEpicSprints: `${SprintBaseUrl}/epic/id`,
};

const EpicBaseUrl = `${BaseUrl}/epic`;
export const EpicUrls = {
    createEpic: EpicBaseUrl,
    getProjectPage: PageUrls.getProjectPage,
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

const ProjectBaseUrl = `${BaseUrl}/project`;
export const ProjectUrls = {
    getProjectPage: PageUrls.getProjectPage,
    createProject: ProjectBaseUrl,
    getProject: ProjectBaseUrl,
};

const TeamBaseUrl = `${BaseUrl}/team`;
export const TeamUrls = {
    getUserTeamPage: PageUrls.getTeamPage,
    createTeam: TeamBaseUrl,
};

const WorkSpaceBaseUrl = `${BaseUrl}/workspace`;
export const WorkSpaceUrls = {
    workSpacePage: PageUrls.getWorkSpacePage,
    updateWorkSpace: WorkSpaceBaseUrl,
    userWorkSpace: `${WorkSpaceBaseUrl}/user`,
    createWorkSpace: `${WorkSpaceBaseUrl}/user`,
};

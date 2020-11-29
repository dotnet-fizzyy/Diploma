//UI routes
export const DefaultRoute = '/';
export const FullViewStoryRoute = '/full-view/:storyId';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const ViewStoryHistoryRoute = '/history/:storyId';
export const NoMatchRoute = '*';

//WebAPI routes
const BaseUrl = process.env.BACK_URL;
export const UsersUrl = BaseUrl + 'users';
export const StoriesUrl = BaseUrl + 'stories';
export const TokenUrl = BaseUrl + 'token';

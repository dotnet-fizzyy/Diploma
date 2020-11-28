//UI routes
export const DefaultRoute = '/';
export const FullViewStoryRoute = '/full-view/:storyId';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const ViewStoryHistoryRoute = '/history/:storyId';
export const NoMatchRoute = '*';

//WebAPI routes
const BaseUrl = 'http://localhost:5001/';
export const UsersUrl = BaseUrl + 'users';
export const StoriesUrl = BaseUrl + 'stories';

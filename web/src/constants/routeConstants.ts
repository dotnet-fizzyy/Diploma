//UI routes
export const DefaultRoute = '/';
export const CreateOrViewStoryRoute = '/:storyId/:action/story';
export const LoginScreenRoute = '/start/login';
export const RegistrationScreenRoute = '/start/registration';
export const NoMatchRoute = '*';

//WebAPI routes
const BaseUrl = 'http://localhost:5001/';
export const UsersUrl = BaseUrl + 'users';
export const StoriesUrl = BaseUrl + 'stories';

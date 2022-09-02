import { IFullUser, IUser, IUserProject, IUserTeam } from '../types/user';

export const mapToUserModel = (data): IUser => ({
    userId: data.userId,
    userName: data.userName,
    password: data.password,
    email: data.email,
    userRole: data.userRole,
    userPosition: data.userPosition,
    teamId: data.teamId,
    isActive: data.isActive,
    avatarLink: data.avatarLink,
    workSpaceId: data.workSpaceId,
    creationDate: data.creationDate ? new Date(data.creationDate) : undefined,
});

export const mapToFullUserModel = (data: any): IFullUser => {
    const user: IUser = mapToUserModel(data);

    return {
        ...user,
        teams: data.teams?.length ? data.teams.map(mapToUserTeam) : [],
        projects: data.projects?.length ? data.projects.map(mapToUserProject) : [],
    };
};

const mapToUserTeam = (data): IUserTeam => ({
    teamId: data.teamId,
    teamName: data.teamName,
    projectId: data.projectId,
});

const mapToUserProject = (data): IUserProject => ({
    projectId: data.projectId,
    projectName: data.projectName,
});

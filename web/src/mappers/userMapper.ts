import { IFullUser, IUser, IUserListItem, IUserProject, IUserTeam } from '../types/userTypes';

export function mapToUserModel(data: any): IUser {
    return {
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
    };
}

export function mapToFullUserModel(data: any): IFullUser {
    const user: IUser = mapToUserModel(data);

    return {
        ...user,
        teams: data.teams && data.teams.length ? data.teams.map(mapToUserTeam) : [],
        projects: data.projects && data.projects ? data.projects.map(mapToUserProject) : [],
    };
}

export function mapToSimpleUserModel(data: any): IUserListItem {
    return {
        userId: data.userId,
        userName: data.userName,
        avatarLink: data.avatarLink,
    };
}

function mapToUserTeam(data: any): IUserTeam {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
    }
}

function mapToUserProject(data: any): IUserProject {
    return {
        projectId: data.projectId,
        projectName: data.projectName,
    }
}
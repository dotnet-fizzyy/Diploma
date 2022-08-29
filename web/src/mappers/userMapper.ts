import { UserPosition, UserRole } from '../constants/user';
import { IFullUser, IUser, IUserProject, IUserSimpleModel, IUserTeam } from '../types/user';

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

export function mapToSimpleUserModel(data: any): IUserSimpleModel {
    return {
        userId: data.userId,
        userName: data.userName,
        userPosition: UserPosition[data.userPosition],
        userRole: UserRole[data.userRole],
    };
}

function mapToUserTeam(data: any): IUserTeam {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
        projectId: data.projectId,
    };
}

function mapToUserProject(data: any): IUserProject {
    return {
        projectId: data.projectId,
        projectName: data.projectName,
    };
}

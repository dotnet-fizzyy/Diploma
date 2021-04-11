import { IFullUser, IUser, IUserListItem, UserPosition, UserRole } from '../types/userTypes';

export function mapToUserModel(data: any): IUser {
    return {
        userId: data.userId,
        userName: data.userName,
        password: data.password,
        email: data.email,
        userRole: UserRole[data.userRole],
        userPosition: UserPosition[data.userPosition],
        teamId: data.teamId,
        isActive: data.isActive,
        avatarLink: data.avatarLink,
        workSpaceId: data.workSpaceId,
        creationDate: data.creationDate ? new Date(data.creationDate) : undefined,
    };
}

export function mapToFullUserModel(data: any): IFullUser {
    const fullUser: IFullUser = mapToUserModel(data);
    fullUser.projectId = data.projectId;
    fullUser.projectName = data.projectName;
    fullUser.teamName = data.teamName;

    return fullUser;
}

export function mapToSimpleUserModel(data: any): IUserListItem {
    return {
        userId: data.userId,
        userName: data.userName,
        avatarLink: data.avatarLink,
    };
}

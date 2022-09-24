import { ProjectPosition, UserRole } from '../constants/user';
import { ITeam, ITeamSimpleModel } from '../types/team';
import { IUser } from '../types/user';

export const mockedTeam: ITeam = {
    location: 'Minsk',
    membersCount: 5,
    teamId: 'testId',
    teamName: 'Team-Flex',
    users: [
        {
            userId: 'Oleg',
            isActive: true,
            email: 'test@mail.com',
            userName: 'Oleg Ryazin',
            avatarLink: '',
            userPosition: ProjectPosition.Developer,
            userRole: UserRole.Engineer,
        } as IUser,
        {
            userId: 'Igor',
            isActive: true,
            email: 'test2@mail.com',
            userName: 'Oleg Ryazin',
            avatarLink: '',
            userPosition: ProjectPosition.Qa,
            userRole: UserRole.Engineer,
        } as IUser,
        {
            userId: 'Dima',
            isActive: true,
            email: 'test3@mail.com',
            userName: 'Dima Yaniuk',
            avatarLink: '',
            userPosition: ProjectPosition.TeamLead,
            userRole: UserRole.Engineer,
        } as IUser,
        {
            userId: 'Kolya',
            isActive: true,
            email: 'test4@mail.com',
            userName: 'Nikolai Ulasevich',
            avatarLink: '',
            userPosition: ProjectPosition.Architecture,
            userRole: UserRole.Manager,
        } as IUser,
    ],
};

export const mockedTeamList: ITeamSimpleModel[] = [
    {
        teamId: '12345',
        teamName: 'team1',
        location: 'Minsk',
    },
    {
        teamId: '54321',
        teamName: 'Team Team Team',
        location: 'Minsk',
    },
    {
        teamId: '098765',
        teamName: 'Awesome Team',
        location: 'Minsk',
    },
];

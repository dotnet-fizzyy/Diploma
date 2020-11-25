import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';

export interface ITeamMembersProps {
    team: ITeam;
    user: IUser;
}

const TeamMembers = (props: ITeamMembersProps) => {
    const { user, team } = props;

    return (
        <div>
            <AvatarGroup max={3}>
                {team &&
                    team.users.map((x) => {
                        return x.userId !== user.userId ? (
                            <Avatar key={x.userId} src={x.avatarLink}>
                                {x.userName.slice(0, 1)}
                            </Avatar>
                        ) : null;
                    })}
            </AvatarGroup>
        </div>
    );
};

export default TeamMembers;

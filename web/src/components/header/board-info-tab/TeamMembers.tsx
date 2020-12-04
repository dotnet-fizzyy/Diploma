import { Avatar, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';

const useStyles = makeStyles(() =>
    createStyles({
        avatar: {
            //width: '30px',
            //height: '30px',
        },
    })
);

export interface ITeamMembersProps {
    team: ITeam;
    user: IUser;
}

const TeamMembers = (props: ITeamMembersProps) => {
    const classes = useStyles();
    const { user, team } = props;

    return (
        <div>
            <AvatarGroup max={3}>
                {team &&
                    team.users &&
                    team.users.map((x, index) => {
                        return x.userId !== user.userId ? (
                            <Tooltip title={x.userName} key={x.userId}>
                                <Avatar className={classes.avatar} src={x.avatarLink}>
                                    {x.userName.slice(0, 1)}
                                </Avatar>
                            </Tooltip>
                        ) : null;
                    })}
            </AvatarGroup>
        </div>
    );
};

export default TeamMembers;

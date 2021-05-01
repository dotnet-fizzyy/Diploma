import { Avatar, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { ITeam } from '../../../types/teamTypes';
import { getFirstNameLetter } from '../../../utils';

const useStyles = makeStyles(() =>
    createStyles({
        addUserButton: {
            borderRadius: '50%',
            width: '43px',
            height: '43px',
            backgroundColor: '#75BAF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            cursor: 'pointer',
            marginRight: '10px',
        },
        avatar: {
            borderColor: '#AFC1C4',
            backgroundColor: 'rgba(189, 189, 189)',
        },
    })
);

export interface ITeamMembersProps {
    team: ITeam;
    userId: string;
    onClickCreateUser: () => void;
}

const TeamMembers = (props: ITeamMembersProps) => {
    const classes = useStyles();
    const { userId, team, onClickCreateUser } = props;

    return (
        <>
            <Tooltip title="Add new team member">
                <div className={classes.addUserButton} onClick={onClickCreateUser}>
                    <Add />
                </div>
            </Tooltip>
            <AvatarGroup max={5} spacing="small">
                {team &&
                    team.users &&
                    team.users.map((x, index) => {
                        return x.userId !== userId ? (
                            <Tooltip title={x.userName} key={x.userId}>
                                <Avatar className={classes.avatar} src={x.avatarLink}>
                                    {getFirstNameLetter(x.userName)}
                                </Avatar>
                            </Tooltip>
                        ) : null;
                    })}
            </AvatarGroup>
        </>
    );
};

export default TeamMembers;

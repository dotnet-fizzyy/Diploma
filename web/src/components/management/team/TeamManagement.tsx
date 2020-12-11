import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';
import React from 'react';
import { ITeam } from '../../../types/teamTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        header: {
            margin: '20px 0',
            fontSize: '26px',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        teamLink: {
            fontSize: '18px',
            color: 'lightBlue',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        button: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '145px',
            height: '45px',
            fontSize: '16px',
            textTransform: 'capitalize',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                border: '1px solid lightgrey',
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        emptyResults: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            marginTop: '30px',
        },
        userContainer: {
            display: 'flex',
            margin: '10px 0',
            fontFamily: 'Poppins',
            flexDirection: 'row',
            alignItems: 'flex-end',
        },
        userName: {
            fontSize: '22px',
        },
        userPosition: {
            fontSize: '20px',
            color: '#AFC1C4',
            marginLeft: '2px',
        },
        isActive: {
            color: 'green',
        },
        isBlocked: {
            color: '#FF3838',
        },
    })
);

export interface ITeamManagementProps {
    team: ITeam;
    onClickAddUser: () => void;
}

const TeamManagement = (props: ITeamManagementProps) => {
    const classes = useStyles();
    const { team, onClickAddUser } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <span className={classes.header}>
                    {team.teamName} | {team.location}
                </span>
                <Button onClick={onClickAddUser} className={classes.button} variant="outlined" startIcon={<AddIcon />}>
                    Add User
                </Button>
                <div>
                    {team.users && team.users.length ? (
                        team.users.map((user) => (
                            <div className={classes.userContainer} key={user.userId}>
                                <span className={classes.userName}>{user.userName}</span>
                                <span className={classes.userPosition}>| {user.userRole}</span>
                                <span className={classes.userPosition}>| {user.userPosition}</span>
                                <span
                                    className={classnames(classes.userPosition, {
                                        [classes.isActive]: user.isActive,
                                        [classes.isBlocked]: !user.isActive,
                                    })}
                                >
                                    | {user.isActive ? 'Active' : 'Blocked'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <span className={classes.emptyResults}>No users yet created</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;

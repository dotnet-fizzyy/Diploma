import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { IUser, UserPosition, UserRole } from '../../types/userTypes';
import { getFirstNameLetter } from '../../utils';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            maxWidth: '400px',
            minHeight: '300px',
            backgroundColor: '#FFF',
            borderRadius: '10px',
        },
        body: {
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '14px',
        },
        avatar: {
            width: '80px',
            height: '80px',
            fontSize: '43px',
            marginRight: '20px',
        },
        userNameContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        userName: {
            fontWeight: 'bold',
            fontSize: '20px',
            workBreak: 'break-work',
        },
        description: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: '20px 0',
        },
        item: {
            flexGrow: 1,
            flexBasis: '150px',
            flexShrink: 0,
            marginBottom: '10px',
        },
        descriptionLabel: {
            fontSize: '16px',
            fontWeight: 600,
        },
    })
);

export interface ITeamPersonCardProps {
    user: IUser;
}

const TeamPersonCard = (props: ITeamPersonCardProps) => {
    const classes = useStyles();
    const { user } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.header}>
                    <Avatar src={user.avatarLink} className={classes.avatar}>
                        {getFirstNameLetter(user.userName)}
                    </Avatar>
                    <div className={classes.userNameContainer}>
                        <span className={classnames(classes.text, classes.userName)}>{user.userName}</span>
                        <span className={classnames(classes.text)}>
                            Employment Date: {moment(user.creationDate).format(DateFormat)}
                        </span>
                    </div>
                </div>
                <div className={classes.description}>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Role: </span>
                        <span className={classes.text}>{UserRole[user.userRole]}</span>
                    </div>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Status: </span>
                        <span className={classes.text}>{user.isActive ? 'Active' : 'Deactivated'}</span>
                    </div>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Position: </span>
                        <span className={classes.text}>{UserPosition[user.userPosition]}</span>
                    </div>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Email: </span>
                        <span className={classes.text}>{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPersonCard;

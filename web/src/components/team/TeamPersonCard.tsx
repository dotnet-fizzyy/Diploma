import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { ProjectPosition, UserRole } from '../../constants/user';
import { IUser } from '../../types/user';
import { getFirstLetter } from '../../utils';
import Button, { ButtonVariant } from '../common/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            maxWidth: '420px',
            minHeight: '270px',
            maxHeight: '300px',
            backgroundColor: '#FFF',
            borderRadius: '10px',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
        },
        body: {
            boxSizing: 'border-box',
            height: '100%',
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
            wordBreak: 'break-all',
        },
        descriptionLabel: {
            fontSize: '16px',
            fontWeight: 600,
        },
        activePerson: {
            color: '#a2ffa0',
        },
        deactivatedPerson: {
            color: '#ffbdb9',
        },
        buttonContainer: {
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
        },
    })
);

export interface ITeamPersonCardProps {
    isEditingAllowed: boolean;
    user: IUser;
    onClickChangeStatus: (userId: string, isActive: boolean) => void;
}

const TeamPersonCard = (props: ITeamPersonCardProps) => {
    const classes = useStyles();
    const { isEditingAllowed, user, onClickChangeStatus } = props;

    const onClick = (): void => {
        onClickChangeStatus(user.userId, !user.isActive);
    };

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.header}>
                    <Avatar src={user.avatarLink} className={classes.avatar}>
                        {getFirstLetter(user.userName)}
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
                        <span
                            className={classnames(classes.text, {
                                [classes.activePerson]: user.isActive,
                                [classes.deactivatedPerson]: !user.isActive,
                            })}
                        >
                            {user.isActive ? 'Active' : 'Deactivated'}
                        </span>
                    </div>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Position: </span>
                        <span className={classes.text}>{ProjectPosition[user.userPosition]}</span>
                    </div>
                    <div className={classes.item}>
                        <span className={classnames(classes.text, classes.descriptionLabel)}>Email: </span>
                        <span className={classes.text}>{user.email}</span>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                    {isEditingAllowed && (
                        <Button
                            label={user.isActive ? 'Deactivate' : 'Activate'}
                            disabled={false}
                            buttonVariant={user.isActive ? ButtonVariant.DANGER : ButtonVariant.SUCCESS}
                            onClick={onClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamPersonCard;

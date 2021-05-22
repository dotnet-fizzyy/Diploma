import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { getFirstNameLetter } from '../../utils';

const useStyles = makeStyles(() =>
    createStyles({
        footer: {
            minHeight: '40px',
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#242624',
            justifyContent: 'center',
            alignItems: 'center',
            '& span': {
                marginLeft: '7px',
            },
        },
        iconUser: {
            fontSize: '14px',
            width: '22px',
            height: '22px',
        },
        currentStoryStatus: {
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            '& span': {
                display: 'block',
                fontSize: '18px',
                fontWeight: 'bold',
                margin: '4px 0',
                textAlign: 'center',
            },
        },
        currentBlocked: {
            backgroundColor: '#ffbdb9',
            color: 'red',
        },
        currentReady: {
            backgroundColor: '#a2ffa0',
            color: 'green',
        },
        footerText: {
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
    })
);

export interface IStoryFooterProps {
    avatarLink: string;
    userName: string;
    isReady: boolean;
    isBlocked: boolean;
}

const StoryFooter = (props: IStoryFooterProps) => {
    const classes = useStyles();
    const { userName, avatarLink, isBlocked, isReady } = props;

    return (
        <React.Fragment>
            <div className={classes.footer}>
                <Avatar src={avatarLink} className={classes.iconUser}>
                    {getFirstNameLetter(userName)}
                </Avatar>
                <span>{userName}</span>
            </div>
            {(isReady || isBlocked) && (
                <div
                    className={classnames(classes.currentStoryStatus, {
                        [classes.currentReady]: isReady,
                        [classes.currentBlocked]: isBlocked,
                    })}
                >
                    <span className={classes.footerText}>{isReady ? 'Ready' : 'Blocked'}</span>
                </div>
            )}
        </React.Fragment>
    );
};

export default React.memo(StoryFooter);

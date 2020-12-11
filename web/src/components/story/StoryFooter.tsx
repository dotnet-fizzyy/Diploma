import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        footer: {
            height: '40px',
            display: 'flex',
            fontFamily: 'Poppins',
            color: '#242624',
            justifyContent: 'center',
            alignItems: 'center',
            '& span': {
                marginLeft: '7px',
            },
        },
        iconUser: {
            fontSize: '26px',
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
    const { userName, isBlocked, isReady } = props;

    return (
        <React.Fragment>
            <div className={classes.footer}>
                <AccountCircleIcon className={classes.iconUser} />
                <span>{userName}</span>
            </div>
            {(isReady || isBlocked) && (
                <div
                    className={classnames(classes.currentStoryStatus, {
                        [classes.currentReady]: isReady,
                        [classes.currentBlocked]: isBlocked,
                    })}
                >
                    <span>{isReady ? 'Ready' : 'Blocked'}</span>
                </div>
            )}
        </React.Fragment>
    );
};

export default React.memo(StoryFooter);

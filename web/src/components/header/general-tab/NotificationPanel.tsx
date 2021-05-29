import { Popover } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../../constants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '350px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
        },
        notificationHeader: {
            width: '100%',
            padding: '5px 10px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            color: '#242126',
        },
        boldText: {
            fontWeight: 600,
            fontSize: '18px',
        },
        descText: {
            color: '#AFC1C4',
            marginRight: '10px',
        },
        notificationContainer: {
            display: 'flex',
            padding: '10px',
        },
    })
);

export interface INotificationPanelProps {
    userCreationDate: Date;
    anchorPopoverEl: SVGSVGElement;
    onClickOpenPopover: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onClickClosePopover: () => void;
}

const NotificationPanel = (props: INotificationPanelProps) => {
    const classes = useStyles();
    const { userCreationDate, anchorPopoverEl, onClickOpenPopover, onClickClosePopover } = props;

    return (
        <>
            <NotificationsNoneIcon onClick={onClickOpenPopover} />
            <Popover
                anchorEl={anchorPopoverEl}
                open={!!anchorPopoverEl}
                onClose={onClickClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.root}>
                    <div className={classes.notificationHeader}>
                        <span className={classnames(classes.text, classes.boldText)}>Notifications</span>
                    </div>
                    <div className={classes.notificationContainer}>
                        <span className={classnames(classes.text, classes.descText)}>
                            {moment(userCreationDate).format(DateFormat)}
                        </span>
                        <span className={classes.text}>
                            Congratulations! You can work with application right now. Hope you enjoy it!
                        </span>
                    </div>
                </div>
            </Popover>
        </>
    );
};

export default NotificationPanel;

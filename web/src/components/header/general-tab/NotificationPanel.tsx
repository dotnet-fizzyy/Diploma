import { Popover } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import React from 'react';

export interface INotificationPanelProps {
    anchorPopoverEl: SVGSVGElement;
    onClickOpenPopover: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onClickClosePopover: () => void;
}

const NotificationPanel = (props: INotificationPanelProps) => {
    const { anchorPopoverEl, onClickOpenPopover, onClickClosePopover } = props;

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
                <div>text</div>
            </Popover>
        </>
    );
};

export default NotificationPanel;

import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { UserPosition } from '../../../constants/userConstants';
import { IUser } from '../../../types/user';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
        },
        userInfo: {
            display: 'inherit',
            flexDirection: 'column',
            marginRight: '10px',
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
        iconsStyle: {
            marginLeft: '6px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        userPosition: {
            fontSize: '12px',
            textAlign: 'right',
            color: '#AFC1C4',
        },
        userName: {
            fontSize: '14px',
        },
        menuItem: {
            fontFamily: 'Poppins',
            fontWeight: 400,
        },
    })
);

export interface IMenuProps {
    anchor: HTMLElement;
    user: IUser;
    onClickDisplayMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onClickCloseMenu: () => void;
    onClickOpenProfile: () => void;
    onClickLogOut: () => void;
}

const TabMenu = (props: IMenuProps) => {
    const classes = useStyles();
    const { anchor, onClickCloseMenu, user, onClickDisplayMenu, onClickOpenProfile, onClickLogOut } = props;

    return (
        <>
            <div className={classes.root} onClick={onClickDisplayMenu}>
                <div className={classes.userInfo}>
                    <span className={classes.userName}>{user.userName}</span>
                    <span className={classes.userPosition}>{UserPosition[user.userPosition]}</span>
                </div>
                <Avatar src={user.avatarLink}>{user.userName.slice(0, 1)}</Avatar>
                {!anchor ? (
                    <KeyboardArrowDownIcon className={classes.iconsStyle} />
                ) : (
                    <KeyboardArrowUpIcon className={classes.iconsStyle} />
                )}
            </div>
            <Menu
                anchorEl={anchor}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={Boolean(anchor)}
                onClose={onClickCloseMenu}
            >
                <MenuItem className={classes.menuItem} onClick={onClickOpenProfile}>
                    Profile
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={onClickLogOut}>
                    Log out
                </MenuItem>
            </Menu>
        </>
    );
};

export default TabMenu;

import { Menu as MuiMenu, MenuItem } from '@material-ui/core';
import React from 'react';

export interface IMenuProps {
    anchor: HTMLElement;
    onClickCloseMenu: () => void;
    onClickOpenProfile: () => void;
    onClickLogOut: () => void;
}

const Menu = (props: IMenuProps) => {
    const { anchor, onClickCloseMenu, onClickOpenProfile, onClickLogOut } = props;

    return (
        <MuiMenu
            anchorEl={anchor}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={Boolean(anchor)}
            onClose={onClickCloseMenu}
        >
            <MenuItem onClick={onClickOpenProfile}>Profile</MenuItem>
            <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
        </MuiMenu>
    );
};

export default Menu;

import { Avatar, Menu, MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { IUser } from '../../../types/userTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '60px',
            minWidth: '100%',
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        userInfoContainer: {
            display: 'inherit',
            flexDirection: 'inherit',
            height: '100%',
            alignItems: 'center',
        },
        userInfo: {
            display: 'inherit',
            flexDirection: 'column',
        },
        usefulReferencesContainer: {
            marginRight: '20px',
        },
    })
);

export interface IGeneralTabProps {
    user: IUser;
    searchTerm: string;
    anchor: HTMLElement;
    onClickDisplayMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onChangeSearchTerm: (value: string) => void;
    onClickCloseMenu: () => void;
    onClickLogOut: () => void;
    onBlur: () => void;
}

const GeneralTab = (props: IGeneralTabProps) => {
    const classes = useStyles();
    const {
        anchor,
        user,
        searchTerm,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
        onChangeSearchTerm,
        onBlur,
    } = props;

    return (
        <div className={classes.root}>
            {user && user.userId && (
                <>
                    <p>Icon</p>
                    <TextField
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(event: { target: { value: string } }) => onChangeSearchTerm(event.target.value)}
                        onBlur={() => onBlur()}
                        InputProps={{ startAdornment: <SearchIcon /> }}
                    />
                    <div>
                        <span>Board</span>
                        <span>Current_project</span>
                        <span>My tasks</span>
                    </div>
                    <div className={classes.userInfoContainer} onClick={onClickDisplayMenu}>
                        <div className={classes.userInfo}>
                            <span>{user.userName}</span>
                            <span>{user.userPosition}</span>
                        </div>
                        <Avatar src={user.avatarLink}>{user.userName.slice(0, 1)}</Avatar>
                        {!anchor ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </div>
                    <Menu
                        anchorEl={anchor}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={Boolean(anchor)}
                        onClose={onClickCloseMenu}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
};

export default GeneralTab;

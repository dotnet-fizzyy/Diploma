import { Avatar, Menu, MenuItem, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../../constants/routeConstants';
import { IUser } from '../../../types/userTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            height: '60px',
            minWidth: '100%',
        },
        generalTabContainer: {
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
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
            marginRight: '10px',
            fontFamily: 'Roboto',
            '& span': {
                '&:last-child': {
                    marginTop: '3px',
                },
            },
        },
        mainTabsContainer: {},
        tab: {
            marginLeft: '50px',
            textDecoration: 'none',
        },
        searchField: {
            width: '300px',
        },
        usefulReferencesContainer: {
            marginRight: '20px',
        },
        iconsStyle: {
            '&:hover': {
                cursor: 'pointer',
            },
        },
        userPosition: {
            fontSize: '14px',
            textAlign: 'right',
            color: '#AFC1C4',
        },
        userName: {
            fontSize: '16px',
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
            <div className={classes.generalTabContainer}>
                {user && user.userId && (
                    <>
                        <p>Icon</p>
                        <TextField
                            className={classes.searchField}
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(event: { target: { value: string } }) => onChangeSearchTerm(event.target.value)}
                            onBlur={() => onBlur()}
                            InputProps={{ startAdornment: <SearchIcon /> }}
                        />
                        <div className={classes.mainTabsContainer}>
                            <Link to={routeConstants.ProjectBoardRoute} className={classes.tab}>
                                Board
                            </Link>
                            <Link to={routeConstants.ProjectsViewerRoute} className={classes.tab}>
                                Projects
                            </Link>
                            <Link to={routeConstants.ProjectsViewerRoute} className={classes.tab}>
                                My tasks
                            </Link>
                            <Link to={routeConstants.ProjectsViewerRoute} className={classes.tab}>
                                Teams
                            </Link>
                        </div>
                        <div className={classes.userInfoContainer} onClick={onClickDisplayMenu}>
                            <div className={classes.userInfo}>
                                <span className={classes.userName}>{user.userName}</span>
                                <span className={classes.userPosition}>{user.userPosition}</span>
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
                            <MenuItem>Profile</MenuItem>
                            <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
                        </Menu>
                    </>
                )}
            </div>
        </div>
    );
};

export default GeneralTab;

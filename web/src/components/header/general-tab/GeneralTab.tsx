import { createStyles, makeStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultRoute } from '../../../constants/routeConstants';
import LogoIcon from '../../../static/Icon.svg';
import { IStorySimpleModel } from '../../../types/storyTypes';
import { IFullUser, IUserSimpleModel } from '../../../types/userTypes';
import SearchField from './SearchField';
import TabLinks from './TabLinks';
import TabMenu from './TabMenu';

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
        searchResultsContainer: {
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto 0 80px',
        },
        mainTabsContainer: {
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        notificationsBell: {
            margin: '0 40px 0 auto',
            cursor: 'pointer',
        },
        logo: {
            width: '65px',
            height: '44px',
            backgroundImage: `url(${LogoIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    })
);

export interface IGeneralTabProps {
    user: IFullUser;
    searchTerm: string;
    anchor: HTMLElement;
    searchUsers: IUserSimpleModel[];
    searchStories: IStorySimpleModel[];
    selectedProjectId: string;
    selectedTeamId: string;
    searching: boolean;
    onClickDisplayMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onChangeSearchTerm: (value: string) => void;
    onClickCloseMenu: () => void;
    onClickOpenProfile: () => void;
    onClickLogOut: () => void;
    onChangeTeam: (e: any) => void;
    onChangeProject: (e: any) => void;
    onBlur: () => void;
}

const GeneralTab = (props: IGeneralTabProps) => {
    const classes = useStyles();
    const {
        anchor,
        user,
        searchTerm,
        searchUsers,
        searchStories,
        selectedProjectId,
        selectedTeamId,
        searching,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickOpenProfile,
        onClickLogOut,
        onChangeSearchTerm,
        onChangeTeam,
        onChangeProject,
        onBlur,
    } = props;

    return (
        user &&
        user.userId && (
            <div className={classes.root}>
                <div className={classes.generalTabContainer}>
                    <Link to={DefaultRoute}>
                        <div className={classes.logo} />
                    </Link>
                    <div className={classes.searchResultsContainer}>
                        <SearchField
                            searching={searching}
                            searchTerm={searchTerm}
                            searchUsers={searchUsers}
                            searchStories={searchStories}
                            onBlur={onBlur}
                            onChangeSearchTerm={onChangeSearchTerm}
                        />
                    </div>
                    <div className={classes.mainTabsContainer}>
                        <TabLinks
                            userRole={user.userRole}
                            userPosition={user.userPosition}
                            teams={user.teams}
                            projects={user.projects}
                            onChangeProject={onChangeProject}
                            onChangeTeam={onChangeTeam}
                            selectedProjectId={selectedProjectId}
                            selectedTeamId={selectedTeamId}
                        />
                    </div>
                    <div className={classes.notificationsBell}>
                        <NotificationsNoneIcon />
                    </div>
                    <TabMenu
                        anchor={anchor}
                        user={user}
                        onClickDisplayMenu={onClickDisplayMenu}
                        onClickCloseMenu={onClickCloseMenu}
                        onClickLogOut={onClickLogOut}
                        onClickOpenProfile={onClickOpenProfile}
                    />
                </div>
            </div>
        )
    );
};

export default GeneralTab;

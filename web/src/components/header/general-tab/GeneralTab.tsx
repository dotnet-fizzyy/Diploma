import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultRoute } from '../../../constants/routeConstants';
import LogoIcon from '../../../static/Icon.svg';
import { IStory } from '../../../types/storyTypes';
import { IUser } from '../../../types/userTypes';
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
        },
        mainTabsContainer: {},
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
    user: IUser;
    searchTerm: string;
    anchor: HTMLElement;
    searchResults: IStory[];
    onClickDisplayMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onChangeSearchTerm: (value: string) => void;
    onClickCloseMenu: () => void;
    onClickOpenProfile: () => void;
    onClickLogOut: () => void;
    onBlur: () => void;
}

const GeneralTab = (props: IGeneralTabProps) => {
    const classes = useStyles();
    const {
        anchor,
        user,
        searchTerm,
        searchResults,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickOpenProfile,
        onClickLogOut,
        onChangeSearchTerm,
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
                            searchTerm={searchTerm}
                            searchResults={searchResults}
                            onBlur={onBlur}
                            onChangeSearchTerm={onChangeSearchTerm}
                        />
                    </div>
                    <div className={classes.mainTabsContainer}>
                        <TabLinks teamId={user.teamId} />
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

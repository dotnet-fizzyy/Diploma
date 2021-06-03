import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { SidebarTypes } from '../../constants';
import SidebarStoryDescriptionContainer from './story-description/SidebarStoryDescriptionContainer';
import SidebarStoryRemoveContainer from './story-remove/SidebarStoryRemoveContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '450px',
            minHeight: '100%',
            position: 'relative',
        },
        closeSidebarIcon: {
            position: 'absolute',
            fontSize: '30px',
            top: '1%',
            right: '1%',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        body: {
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box',
        },
        spinnerContainer: {
            position: 'absolute',
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
            right: 0,
        },
        spinner: {
            marginBottom: '100px',
            color: '#75BAF7',
        },
    })
);

export interface ISidebarProps {
    sidebarType: SidebarTypes;
    isLoading: boolean;
    onCloseTab: () => void;
}

const Sidebar = (props: ISidebarProps) => {
    const classes = useStyles();
    const { sidebarType, isLoading, onCloseTab } = props;

    return (
        <div className={classes.root}>
            <div className={classes.closeSidebarIcon}>
                <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
            </div>
            {isLoading && (
                <div className={classes.spinnerContainer}>
                    <CircularProgress color="primary" className={classes.spinner} size={60} />
                </div>
            )}
            <div className={classes.body}>
                {(() => {
                    switch (sidebarType) {
                        case SidebarTypes.STORY_DESCRIPTION:
                            return <SidebarStoryDescriptionContainer />;
                        case SidebarTypes.STORY_REMOVE:
                            return <SidebarStoryRemoveContainer />;
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
};

export default React.memo(Sidebar);

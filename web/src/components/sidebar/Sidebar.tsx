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
            height: '100%',
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
            height: 'inherit',
            padding: '20px',
            boxSizing: 'border-box',
        },
    })
);

export interface ISidebarProps {
    sidebarType: SidebarTypes;
    onCloseTab: () => void;
}

const Sidebar = (props: ISidebarProps) => {
    const classes = useStyles();
    const { sidebarType, onCloseTab } = props;

    return (
        <div className={classes.root}>
            <div className={classes.closeSidebarIcon}>
                <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
            </div>
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

import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        storyId: {
            marginLeft: '10px',
            fontSize: '16px',
        },
        iconBlock: {
            fontSize: '22px',
            color: '#FF3838',
            margin: '0 10px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        isBlocked: {
            backgroundColor: '#FF3838',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        iconReady: {
            fontSize: '22px',
            color: '#a2ffa0',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        isReady: {
            backgroundColor: '#a2ffa0',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        iconMain: {
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
            marginLeft: '10px',
        },
        isDefect: {
            backgroundColor: 'darkorange',
        },
        isStory: {
            backgroundColor: '#3272d9',
        },
        actionButtons: {
            display: 'inherit',
            flexDirection: 'inherit',
            alignItems: 'inherit',
        },
    })
);

export interface IStoryHeaderProps {
    children: React.ReactNode;
    storyId: string;
    isDefect: boolean;
    isReady: boolean;
    isBlocked: boolean;
    onSelectStory: (storyId: string) => void;
    onMakeStoryReady: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
}

const StoryHeader = (props: IStoryHeaderProps) => {
    const classes = useStyles();
    const { children, storyId, isReady, isBlocked, onSelectStory, onMakeStoryReady, onMakeStoryBlocked } = props;

    return (
        <div className={classes.header}>
            <span onClick={() => onSelectStory(storyId)} className={classes.storyId}>
                {storyId}
            </span>
            <div className={classes.actionButtons}>
                <CheckCircleOutlinedIcon
                    className={classnames(classes.iconReady, {
                        [classes.isReady]: isReady,
                    })}
                    onClick={() => onMakeStoryReady(storyId)}
                />
                <BlockOutlinedIcon
                    className={classnames(classes.iconBlock, {
                        [classes.isBlocked]: isBlocked,
                    })}
                    onClick={() => onMakeStoryBlocked(storyId)}
                />
                {children}
            </div>
        </div>
    );
};

export default React.memo(StoryHeader);

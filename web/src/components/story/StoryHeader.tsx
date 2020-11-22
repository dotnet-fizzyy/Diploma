import { createStyles, makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import BugReportIcon from '@material-ui/icons/BugReport';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            height: '50px',
            display: 'flex',
            alignItems: 'center',
        },
        storyId: {
            marginLeft: '10px',
            fontSize: '16px',
        },
        iconBlock: {
            fontSize: '22px',
            color: 'red',
            marginLeft: '5px',
        },
        isBlocked: {
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        iconReady: {
            fontSize: '22px',
            color: 'green',
            marginLeft: '15px',
        },
        isReady: {
            backgroundColor: 'green',
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
    const {
        children,
        storyId,
        isReady,
        isDefect,
        isBlocked,
        onSelectStory,
        onMakeStoryReady,
        onMakeStoryBlocked,
    } = props;

    return (
        <div className={classes.header}>
            {isDefect ? (
                <BugReportIcon className={classnames(classes.iconMain, classes.isDefect)} />
            ) : (
                <AssignmentIcon className={classnames(classes.iconMain, classes.isStory)} />
            )}
            <span onClick={() => onSelectStory(storyId)} className={classes.storyId}>
                {storyId}
            </span>
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
    );
};

export default React.memo(StoryHeader);

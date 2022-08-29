import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { ColumnNames } from '../../constants/board';
import { IStorySimpleModel } from '../../types/story';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '20px',
            boxSizing: 'border-box',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
            borderRadius: '5px',
            backgroundColor: 'white',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            color: '#242126',
        },
        splitLine: {
            margin: '0 10px',
            color: '#AFC1C4',
        },
        descriptionText: {
            color: '#AFC1C4',
        },
        readyStory: {
            color: '#a2ffa0',
            fontWeight: 400,
        },
        blockedStory: {
            color: '#ffbdb9',
            fontWeight: 400,
        },
    })
);

export interface IStatsStoryShortDescription {
    story: IStorySimpleModel;
}

const StatsStoryShortDescription = (props: IStatsStoryShortDescription) => {
    const classes = useStyles();
    const { story } = props;

    return (
        <div className={classes.root}>
            <span className={classes.text}>{story.title}</span>
            <div>
                {story.isReady && (
                    <>
                        <span className={classnames(classes.text, classes.readyStory)}>Ready</span>
                        <span className={classes.splitLine}>|</span>
                    </>
                )}
                {story.isBlocked && (
                    <>
                        <span className={classnames(classes.text, classes.blockedStory)}>Blocked</span>
                        <span className={classes.splitLine}>|</span>
                    </>
                )}
                <span className={classnames(classes.text, classes.descriptionText)}>{story.storyPriority}</span>
                <span className={classes.splitLine}>|</span>
                <span className={classnames(classes.text, classes.descriptionText)}>{story.estimate}d</span>
                <span className={classes.splitLine}>|</span>
                <span className={classnames(classes.text, classes.descriptionText)}>
                    {ColumnNames[story.columnType]}
                </span>
            </div>
        </div>
    );
};

export default StatsStoryShortDescription;

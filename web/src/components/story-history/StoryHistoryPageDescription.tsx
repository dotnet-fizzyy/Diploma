import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { IStory, IStoryHistory, StoryHistoryAction } from '../../types/storyTypes';
import {
    getStoryHistoryActionText,
    getStoryHistoryActionTextForBooleanValues,
    getStoryHistoryUpdateAction,
} from '../../utils/storyHistoryUtils';
import MainLabel, { LabelType } from '../common/MainLabel';
import StoryHistoryCharts from './StoryHistoryCharts';
import StoryHistoryShortDescription from './StoryHistoryShortDescription';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
        },
        changesContainer: {
            marginRight: '50px',
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 400,
        },
        storyHistoryItem: {
            marginTop: '20px',
        },
        chartsContainer: {},
        descPagePartLabel: {
            marginLeft: '3px',
        },
    })
);

export interface IStoryHistoryPageDescriptionProps {
    story: IStory;
    storyHistoryItems: IStoryHistory[];
}

const StoryHistoryPageDescription = (props: IStoryHistoryPageDescriptionProps) => {
    const classes = useStyles();
    const { story, storyHistoryItems } = props;
    const booleanStatuses: string[] = ['Ready', 'Blocked'];

    const getStoryHistoryItem = ({
        storyHistoryId,
        userName,
        storyHistoryAction,
        creationDate,
        previousValue,
        currentValue,
        fieldName,
    }: IStoryHistory): React.ReactNode => {
        switch (storyHistoryAction) {
            case StoryHistoryAction.Add:
                return (
                    <span key={storyHistoryId} className={classnames(classes.text, classes.storyHistoryItem)}>
                        <b>{moment(creationDate).format(DateFormat)}</b>: <b>{userName}</b>{' '}
                        {getStoryHistoryActionText(StoryHistoryAction.Add)} story.
                    </span>
                );
            case StoryHistoryAction.Update:
                return (
                    <span key={storyHistoryId} className={classnames(classes.text, classes.storyHistoryItem)}>
                        <b>{moment(creationDate).format(DateFormat)}</b>: <b>{userName}</b>{' '}
                        {booleanStatuses.includes(fieldName)
                            ? getStoryHistoryActionTextForBooleanValues(fieldName, currentValue === 'True')
                            : getStoryHistoryUpdateAction(fieldName, previousValue, currentValue)}
                        .
                    </span>
                );
            case StoryHistoryAction.Remove:
                return (
                    <span key={storyHistoryId} className={classnames(classes.text, classes.storyHistoryItem)}>
                        <b>{moment(creationDate).format(DateFormat)}</b>: {userName} removed story.
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.root}>
            <MainLabel title="Story History" variant={LabelType.PRIMARY} />
            {story && (
                <StoryHistoryShortDescription
                    title={story.title}
                    creationDate={story.creationDate}
                    columnId={story.columnType}
                    estimate={story.estimate}
                />
            )}
            <div className={classes.body}>
                <div className={classes.changesContainer}>
                    <MainLabel title="Changes" variant={LabelType.SECONDARY} />
                    {storyHistoryItems && storyHistoryItems.length ? storyHistoryItems.map(getStoryHistoryItem) : null}
                </div>
                <div className={classes.chartsContainer}>
                    <div className={classes.descPagePartLabel}>
                        <MainLabel title="Timeline changes" variant={LabelType.SECONDARY} />
                    </div>
                    <StoryHistoryCharts storyHistoryItems={storyHistoryItems} />
                </div>
            </div>
        </div>
    );
};

export default StoryHistoryPageDescription;

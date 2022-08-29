import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat, UnspecifiedValue } from '../../constants';
import { IStory, IStoryHistory, StoryHistoryAction } from '../../types/story';
import { getStoryHistoryActionText } from '../../utils/storyHistoryUtils';
import Button from '../common/Button';
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
            width: '100%',
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 400,
        },
        storyHistoryItem: {
            marginTop: '20px',
        },
        chartsContainer: {
            flexGrow: 1.5,
            flexBasis: 0,
            flexShrink: 0,
        },
        descPagePartLabel: {
            marginLeft: '3px',
        },
        buttonContainer: {
            width: 'fit-content',
            marginTop: '20px',
        },
    })
);

export interface IStoryHistoryPageDescriptionProps {
    story: IStory;
    storyHistoryItems: IStoryHistory[];
    selectedDate: string;
    onChangeSelectedDateFilter: (selectedDate: string) => void;
    onClickResetFilter: () => void;
}

const StoryHistoryPageDescription = (props: IStoryHistoryPageDescriptionProps) => {
    const classes = useStyles();
    const { story, storyHistoryItems, selectedDate, onChangeSelectedDateFilter, onClickResetFilter } = props;
    const booleanStatuses: string[] = ['Ready', 'Blocked'];

    const getStoryHistoryActionTextForBooleanValues = (fieldName: string, value: boolean): React.ReactNode => {
        return value ? (
            <span>
                set <b>{fieldName}</b> status
            </span>
        ) : (
            <span>
                removed <b>{fieldName}</b> status
            </span>
        );
    };

    const getStoryHistoryUpdateAction = (
        fieldName: string,
        previousValue: string,
        currentValue: string
    ): React.ReactNode => (
        <>
            {getStoryHistoryActionText(StoryHistoryAction.Update)} <b>{fieldName}</b> from{' '}
            <b>{previousValue || <i>{UnspecifiedValue}</i>}</b> to <b>{currentValue || <i>{UnspecifiedValue}</i>}</b>{' '}
        </>
    );

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
                    {storyHistoryItems && storyHistoryItems.length
                        ? storyHistoryItems
                              .filter((x) =>
                                  selectedDate ? selectedDate === moment(x.creationDate).format(DateFormat) : true
                              )
                              .map(getStoryHistoryItem)
                        : null}
                </div>
                <div className={classes.chartsContainer}>
                    <div className={classes.descPagePartLabel}>
                        <MainLabel title="Timeline changes" variant={LabelType.SECONDARY} />
                    </div>
                    <StoryHistoryCharts
                        storyHistoryItems={storyHistoryItems}
                        selectedDate={selectedDate}
                        onChangeSelectedDateFilter={onChangeSelectedDateFilter}
                    />
                    <div className={classes.buttonContainer}>
                        <Button disabled={false} label="Reset filter" onClick={onClickResetFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryHistoryPageDescription;

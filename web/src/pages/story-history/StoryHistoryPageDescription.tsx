import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';
import { DateFormat } from '../../constants';
import { IStoryHistory, StoryHistoryAction } from '../../types/storyTypes';
import {
    getStoryHistoryActionText,
    getStoryHistoryActionTextForBooleanValues,
    getStoryHistoryUpdateAction,
} from '../../utils/storyHistoryUtils';
import StoryHistoryCharts from './StoryHistoryCharts';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 400,
        },
        storyHistoryItem: {
            marginTop: '10px',
        },
    })
);

export interface IStoryHistoryPageDescriptionProps {
    storyHistoryItems: IStoryHistory[];
}

const StoryHistoryPageDescription = (props: IStoryHistoryPageDescriptionProps) => {
    const classes = useStyles();
    const { storyHistoryItems } = props;
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
            <StoryHistoryCharts storyHistoryItems={storyHistoryItems} />
            <MainLabel title="Changes" variant={LabelType.SECONDARY} />
            <div className={classes.body}>
                {storyHistoryItems && storyHistoryItems.length ? storyHistoryItems.map(getStoryHistoryItem) : null}
            </div>
        </div>
    );
};

export default StoryHistoryPageDescription;

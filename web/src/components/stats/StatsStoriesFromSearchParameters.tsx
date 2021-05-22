import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IStorySimpleModel } from '../../types/storyTypes';
import MainLabel, { LabelType } from '../common/MainLabel';
import StatsStoryShortDescription from './StatsStoryShortDescription';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            padding: '20px 0',
        },
        labelContainer: {
            marginBottom: '20px',
        },
        storyContainer: {
            marginBottom: '20px',
        },
    })
);

export interface IStatsStoriesFromSearchParametersProps {
    stories: IStorySimpleModel[];
    selectedChartColumn: string;
    selectedSprintId: string;
}

const StatsStoriesFromSearchParameters = (props: IStatsStoriesFromSearchParametersProps) => {
    const classes = useStyles();
    const { stories, selectedSprintId, selectedChartColumn } = props;

    let filteredByColumnStories = stories;
    if (selectedSprintId) {
        filteredByColumnStories = filteredByColumnStories.filter((x) => x.sprintId === selectedSprintId);
    }
    if (selectedChartColumn) {
        filteredByColumnStories = filteredByColumnStories.filter((x) => x.columnType === selectedChartColumn);
    }

    return (
        <div className={classes.root}>
            <div className={classes.labelContainer}>
                <MainLabel title="Available stories" variant={LabelType.SECONDARY} />
            </div>
            {filteredByColumnStories && filteredByColumnStories.length
                ? filteredByColumnStories.map((x) => (
                      <div key={x.storyId} className={classes.storyContainer}>
                          <StatsStoryShortDescription story={x} />
                      </div>
                  ))
                : null}
        </div>
    );
};

export default React.memo(StatsStoriesFromSearchParameters);

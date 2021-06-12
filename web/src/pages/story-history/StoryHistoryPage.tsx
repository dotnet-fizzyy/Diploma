import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import StoryHistoryPageDescription from '../../components/story-history/StoryHistoryPageDescription';
import { IStory, IStoryHistory } from '../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: '100%',
        },
    })
);

export interface IStoryHistoryPageProps {
    story: IStory;
    storyHistoryItems: IStoryHistory[];
    selectedDate: string;
    onChangeSelectedDateFilter: (selectedDate: string) => void;
    onClickResetFilter: () => void;
}

const StoryHistoryPage = (props: IStoryHistoryPageProps) => {
    const classes = useStyles();
    const { storyHistoryItems, story, selectedDate, onChangeSelectedDateFilter, onClickResetFilter } = props;

    return (
        <div className={classes.root}>
            <StoryHistoryPageDescription
                storyHistoryItems={storyHistoryItems}
                story={story}
                selectedDate={selectedDate}
                onChangeSelectedDateFilter={onChangeSelectedDateFilter}
                onClickResetFilter={onClickResetFilter}
            />
        </div>
    );
};

export default StoryHistoryPage;

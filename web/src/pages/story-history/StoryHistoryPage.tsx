import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IStoryHistory } from '../../types/storyTypes';
import StoryHistoryPageDescription from './StoryHistoryPageDescription';

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
    storyHistoryItems: IStoryHistory[];
}

const StoryHistoryPage = (props: IStoryHistoryPageProps) => {
    const classes = useStyles();
    const { storyHistoryItems } = props;

    return (
        <div className={classes.root}>
            <StoryHistoryPageDescription storyHistoryItems={storyHistoryItems} />
        </div>
    );
};

export default StoryHistoryPage;

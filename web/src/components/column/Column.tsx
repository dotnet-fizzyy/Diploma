import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ISelectedItem, IStory } from '../../types/storyTypes';
import Story from '../story/Story';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '270px',
            margin: '0 15px',
        },
        header: {
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            '& span': {
                fontFamily: 'Poppins',
                fontSize: '22px',
                color: '#242126',
                fontWeight: 'bolder',
                marginLeft: '15px',
            },
        },
        body: {
            minHeight: '100vh',
        },
        storiesContainer: {
            marginTop: '15px',
        },
    })
);

export interface IColumnProps {
    column: ISelectedItem;
    stories: IStory[];
    onSelectStory: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
    onMakeStoryReady: (storyId: string) => void;
}

const Column = (props: IColumnProps) => {
    const classes = useStyles();
    const { column, stories, onSelectStory, onMakeStoryBlocked, onMakeStoryReady } = props;

    return (
        <Droppable droppableId={column.key}>
            {(provided) => (
                <div className={classes.root}>
                    <div className={classes.header}>
                        <span>{column.value}</span>
                    </div>
                    <div className={classes.body} ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        {stories.map((story, index) => (
                            <div key={story.storyId} className={classes.storiesContainer}>
                                <Story
                                    story={story}
                                    index={index}
                                    onSelectStory={onSelectStory}
                                    onMakeStoryReady={onMakeStoryReady}
                                    onMakeStoryBlocked={onMakeStoryBlocked}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default React.memo(Column);

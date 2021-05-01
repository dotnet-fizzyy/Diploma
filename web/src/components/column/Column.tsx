import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ISelectedItem, IStory } from '../../types/storyTypes';
import { ITeam } from '../../types/teamTypes';
import Story from '../story/Story';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '270px',
            margin: '0 15px',
        },
        highlightedColumn: {
            border: '1px solid rgba(175, 193, 196, 0.5)',
        },
        header: {
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            '& span': {
                fontFamily: 'Poppins',
                fontSize: '22px',
                color: '#242126',
                fontWeight: 600,
                marginLeft: '15px',
            },
        },
        body: {
            minHeight: '100vh',
        },
        storiesContainer: {
            marginTop: '15px',
            '&:first-child': {
                marginTop: '5px',
            },
        },
    })
);

export interface IColumnProps {
    column: ISelectedItem;
    team: ITeam;
    stories: IStory[];
    isDragging: boolean;
    onSelectStory: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
    onMakeStoryReady: (storyId: string, isReady: boolean, recordVersion: number) => void;
}

const Column = (props: IColumnProps) => {
    const classes = useStyles();
    const { column, team, stories, isDragging, onSelectStory, onMakeStoryBlocked, onMakeStoryReady } = props;

    return (
        <Droppable droppableId={column.key}>
            {(provided) => (
                <div className={classes.root}>
                    <div className={classes.header}>
                        <span>{column.value}</span>
                    </div>
                    <div
                        className={classnames(classes.body, { [classes.highlightedColumn]: isDragging })}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {stories.map((story, index) => (
                            <div key={story.storyId} className={classes.storiesContainer}>
                                <Story
                                    story={story}
                                    index={index}
                                    team={team}
                                    onSelectStory={onSelectStory}
                                    onMakeStoryReady={onMakeStoryReady}
                                    onMakeStoryBlocked={onMakeStoryBlocked}
                                />
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default React.memo(Column);

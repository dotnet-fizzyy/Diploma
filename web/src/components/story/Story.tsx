import { createStyles, makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IStory } from '../../types/storyTypes';
import StoryFooter from './StoryFooter';
import StoryHeader from './StoryHeader';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 10px',
            backgroundColor: 'floralwhite',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        },
        body: {
            minHeight: '120px',
            borderTop: '2px solid #3272d9',
            borderBottom: '2px solid #3272d9',
            padding: '5px 5px',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        header: {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
        },
        storyId: {
            marginLeft: '10px',
            fontSize: '16px',
        },
        iconVert: {
            fontSize: '24px',
            color: 'black',
            marginLeft: '5px',
            marginTop: '5px',
        },
        isBlocked: {
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        isReady: {
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        isDefect: {
            backgroundColor: 'darkorange',
        },
    })
);

export interface IStoryProps {
    story: IStory;
    index: number;
    onSelectStory: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
    onMakeStoryReady: (storyId: string) => void;
}

const Story = (props: IStoryProps) => {
    const classes = useStyles();
    const { story, index, onSelectStory, onMakeStoryReady, onMakeStoryBlocked } = props;

    return (
        <Draggable draggableId={story.storyId} index={index}>
            {(provided) => (
                <div className={classes.root} {...provided.draggableProps} ref={provided.innerRef}>
                    <StoryHeader
                        storyId={story.storyId}
                        isDefect={story.isDefect}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                        onSelectStory={onSelectStory}
                        onMakeStoryReady={onMakeStoryReady}
                        onMakeStoryBlocked={onMakeStoryBlocked}
                    >
                        <div {...provided.dragHandleProps}>
                            <MoreVertIcon className={classes.iconVert} />
                        </div>
                    </StoryHeader>
                    <div className={classes.body}>
                        <span>{story.title}</span>
                    </div>
                    <StoryFooter
                        avatarLink={''}
                        userId={story.userId}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(Story);
